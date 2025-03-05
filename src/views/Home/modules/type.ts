type FieldType = {
  question?: string;
};
interface eventDataType {
  id: string;
  object: string;
  created: number;
  model: string;
  system_fingerprint: string;
  choices: {
    index: number;
    delta: {
      content: null | string;
      reasoning_content: null | string;
    };
    logprobs: null;
    finish_reason: null;
  }[];
}
type eventDataFinishType = eventDataType & "[DONE]" & ": keep-alive";

interface messagesCtxType {
  content: string;
  role: UserRole;
}
export enum UserRole {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
  TOOL = "tool",
}

/**
 * 连接状态
 */
export enum ConnectionState {
    /**
     * 未连接
     */
    NOT,
    /**
     * 发送成功，等待回应
     */
    REQ_SUCCESS,
    /**
     * 等待中
     */
    KEEP_ALIVE,
    /**
     * 连接成功
     */
    SUCCESS,
    /**
     * 回应中...
     */
    INPUT,
    /**
     * 回应结束
     */
    DONE,
    /**
     * 连接失败
     */
    FAIL
}
export type { FieldType, eventDataFinishType, messagesCtxType, eventDataType };
