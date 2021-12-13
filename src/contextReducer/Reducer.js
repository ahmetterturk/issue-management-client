const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ISSUES': {
      return {
        ...state,
        issues: action.data,
      };
    }
    case '': {
      return {
        ...state,
        issues: action.data,
      };
    }

    default:
      return state;
  }
};

export default reducer;
