const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ISSUES': {
      return {
        ...state,
        issues: action.data,
      };
    }
    case 'GET_PROFILES': {
      return {
        ...state,
        issues: action.data,
      };
    }
    case 'GET_USER_INFO': {
      return {
        ...state,
        user: action.data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
