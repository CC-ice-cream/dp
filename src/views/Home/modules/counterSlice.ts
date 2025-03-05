import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  roomQuestionBank: roomQuestionBankState
}

interface roomQuestionBankState {
  /**
   * 题库ID 站点-房间号
   */
  id: string;
  /**
   * 题库列表
   */
  questionList: Array<questionState>;
}

enum QUESTIONTYPE {
  /**
   * 单选
   */
  SELECT,
  /**
   * 多选
   */
  CHECKBOX,
  /**
   * 没有答案，操作题
   */
  HANDSONTASK,
}
enum QUESTIONOPTIONSTATE {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H
}
interface questionOptionState{
  desc: string,
  val: QUESTIONOPTIONSTATE,
  score?: number
}
interface questionState {
  /**
   * id
   */
  id: string;
  /**
   * 考点名称
   */
  examinationName: string
  /**
   * 考试时长
   */
  time: number
  /**
   * 考试分值
   */
  score?: number
  /**
   * 考试得分
   */
  getScore?: number
  /**
   * 考题
   */
  title: string;
  /**
   * 选项
   */
  options?: questionOptionState[]
  /**
   * 考题类型
   */
  type: QUESTIONTYPE;
  /**
   * 答题进度
   */
  progress: number;
  /**
   * 是否开启答题进度
   */
  isProgress: boolean;
  /**
   * 设备导航
   */
  equipmentNav: Array<{
    /**
     * 设备名称
     */
    name: string;
    /**
     * 设备图片
     */
    imgUrl: string;
    /**
     * 题型组件地址
     */
    path: string;
  }>;
  /**
   * 标准答案
   */
  standardAnsewe: string[];
  /**
   * 用户答案
   */
  userAnswer: string[];
  /**
   * 考核提示语
   */
  tips: string;
  /**
   * 该题是否回答正确
   */
  status: boolean;
  /**
   * 该题型操作是否正确
   */
  operationState: boolean;
}
//题库
const roomQuestionBank: roomQuestionBankState = {
  id: "0-0",
  questionList: [
    {
      id: "0-0-0",
      title: "请识别机械加压送风机",
      type: QUESTIONTYPE.SELECT,
      progress: 0,
      isProgress: true,
      standardAnsewe: [],
      userAnswer: [],
      tips: "请查看火灾报警。。。",
      equipmentNav: [
        {
          name: "送风机房",
          imgUrl: "./img.png",
          path: "@/components/button",
        },
      ],
      status: true,
      operationState: true,
      examinationName: '考点一',
      score: 5,
      getScore: 5,
      time: 5,
      options: [
        {
          desc: 'A. 请识别。。。',
          val: QUESTIONOPTIONSTATE.A
        }
      ]
    },
  ],
};

const initialState: CounterState = {
  value: 0,
  roomQuestionBank: roomQuestionBank
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
