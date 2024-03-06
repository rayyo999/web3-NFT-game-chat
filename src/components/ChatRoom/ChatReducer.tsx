enum chatReducerType {
  MESSAGE,
  RECEIVER,
  RECEIVER_IS_VALID,
  IS_PRIVATE,
}
interface State {
  message: string | undefined;
  receiver: string | undefined;
  receiverIsValid: boolean | undefined;
  isPrivate: boolean | undefined;
}
interface Action {
  type: chatReducerType;
  payload: Partial<State>;
}

const ChatReducer = (state: State, action: Action): State | Error => {
  const { type, payload } = action;
  switch (type) {
    case chatReducerType.MESSAGE:
      return { ...state, message: payload.message };
    case chatReducerType.RECEIVER:
      return { ...state, receiver: payload.receiver };
    case chatReducerType.RECEIVER_IS_VALID:
      return { ...state, receiverIsValid: payload.receiverIsValid };
    case chatReducerType.IS_PRIVATE:
      return { ...state, isPrivate: payload.isPrivate };
    default:
      throw new Error(`no such action type : ${type}`);
  }
};
export default ChatReducer;
