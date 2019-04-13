import * as actionTypes from "../actionTypes";

const initialState = {
  userId: null,
  timeLineItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_TODO:
      {
        let newItems = state.timeLineItems.concat();
        const data = action.data;
        newItems.push(data);
        return {
          ...state,
          timeLineItems: newItems
        };
      }
    case actionTypes.SET_USER_ID:
      return {
        ...state,
        userId: action.id,
      };
    default:
      return state;
  }
}