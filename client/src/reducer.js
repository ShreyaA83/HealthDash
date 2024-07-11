// reducers.js
const initialState = {
    cursorType: 'default',
  };
  
  export const cursorReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURSOR_TYPE':
        return { ...state, cursorType: action.payload };
      default:
        return state;
    }
  };
  