/*
 * @Author: xiaoman
 * @Date: 2025-03-05 09:28:12
 * @LastEditors: xiaoman
 * @Description:
 */
import React, { useCallback, useRef, useState } from "react";
import "./index.css";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Alert, Button, Divider, Flex, Form, FormProps, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  eventDataFinishType,
  eventDataType,
  FieldType,
  messagesCtxType,
  UserRole,
  ConnectionState,
} from "./modules/type";
import _ from "lodash";

const Home: React.FC = () => {
  const ctrl = useRef(new AbortController());
  const delayTime = 30000;
  const timeoutId = useRef<null | number>(null!);
  //会话状态
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    ConnectionState.NOT
  );
  //思考内容
  const [reasoningText, setReasoningText] = useState("");
  const fullReason = useRef("");
  //回应内容
  const [responseText, setResponseText] = useState("");
  const fullResponse = useRef("");
  //消息上下文
  const [messagesCtx, setMessagesCtx] = useState<messagesCtxType[]>([
    { role: UserRole.SYSTEM, content: "You are a helpful assistant." },
  ]);
  //提问是否已经发送
  const [isAsk, setIsAsk] = useState(false);
  //
  const [btnDisabled, setBtnDisabled] = useState(false);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    if (connectionState === ConnectionState.KEEP_ALIVE) {
      return false;
    }
    const { question } = values;
    if (question) {
      fetchDP(question);
    }
  };
  //我们来玩一个游戏，你假扮一名宋朝的杂货商人，我是顾客
  // 我听说苏州蜜饯很好吃，你这里有没有？
  //给我来十块！多少钱？
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const mixMessage = useCallback(
    (reqObj: messagesCtxType, resObj: messagesCtxType) => {
      console.log(reqObj, resObj);
      const resMsg = [..._.cloneDeep(messagesCtx), reqObj, resObj];
      setMessagesCtx(resMsg);
    },
    [messagesCtx]
  );
  const fetchDP = useCallback(
    async (q: string) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => ctrl.current.abort(), delayTime);

      const reqObj = {
        role: UserRole.USER,
        content: q,
      };
      const reqMsg = [..._.cloneDeep(messagesCtx), reqObj];
      setBtnDisabled(true);
      await fetchEventSource("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer sk-27c99436e5224795a5ac7d7f54f53f1d",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-reasoner",
          messages: reqMsg,
          stream: true,
          max_tokens: 2048,
        }),
        signal: ctrl.current.signal,
        openWhenHidden: true,
        onopen: async (response) => {
          if (timeoutId.current) clearTimeout(timeoutId.current);
          if (response.ok) {
            setIsAsk(false);
            setConnectionState(ConnectionState.KEEP_ALIVE);
            return;
          }
          setConnectionState(ConnectionState.FAIL);
          throw new Error("连接失败");
        },
        onmessage: (event) => {
          console.log("event:",event);
          setConnectionState(ConnectionState.REQ_SUCCESS);
          if ((event.data as unknown as string) === "") {
            setConnectionState(ConnectionState.KEEP_ALIVE);
            return;
          }
          // 处理结束标记
          if (event.data === "[DONE]") {
            console.log("流式传输结束");
            setConnectionState(ConnectionState.DONE);
            setBtnDisabled(false);
            mixMessage(reqObj, {
              role: UserRole.ASSISTANT,
              content: fullResponse.current,
            });
            return;
          }
          
          // 解析外层事件数据
          const eventData = JSON.parse(
            event.data
          ) as unknown as eventDataFinishType;

          try {
            // 解析嵌套的 data 字段
            const innerData = eventData as unknown as eventDataType;
            // 处理聊天内容块
            if (innerData.object === "chat.completion.chunk") {
              setConnectionState(ConnectionState.INPUT);
              const reasoning_content =
                innerData.choices[0]?.delta?.reasoning_content || "";
              const content = innerData.choices[0]?.delta?.content || "";

              if (reasoning_content) {
                fullReason.current += reasoning_content;
                setReasoningText(fullReason.current);
                // console.log("当前思考内容:", fullReason.current);
              }

              if (content) {
                fullResponse.current += content;
                setResponseText(fullResponse.current);
                // console.log("当前回应内容:", fullResponse.current);
              }
            }
          } catch (e) {
            console.error("数据解析错误:", e);
            setBtnDisabled(false);
          }
        },
        onerror: (err) => {
          console.error("SSE 错误:", err);
          ctrl.current.abort();
          setBtnDisabled(false);
          throw err;
        },
      });
    },
    [messagesCtx, mixMessage]
  );
  return (
    <Flex
      justify="center"
      align="center"
      vertical
      style={{ width: "100%", height: "100%" }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 800, maxWidth: 1800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="input"
          name="question"
          rules={[{ required: true, message: "Please input your question!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" disabled={btnDisabled}>
            提交
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <TextArea
        style={{ width: "800px" }}
        value={reasoningText}
        autoSize={{ minRows: 2, maxRows: 20 }}
        placeholder={isAsk ? "思考中..." : "思考内容"}
      />
      <Divider />
      <TextArea
        style={{ width: "800px" }}
        value={responseText}
        autoSize={{ minRows: 2, maxRows: 20 }}
        placeholder="回应内容"
      />
      <Divider />
      {connectionState === ConnectionState.REQ_SUCCESS && (
        <Alert message="请求已发送" type="success" />
      )}
      {connectionState === ConnectionState.KEEP_ALIVE && (
        <Alert message="等待回应中..." type="success" />
      )}
      {connectionState === ConnectionState.INPUT && (
        <Alert message="解答中...请耐心等待" type="success" />
      )}
      {connectionState === ConnectionState.FAIL && (
        <Alert message="连接失败" type="error" />
      )}
    </Flex>
  );
};
export default Home;
