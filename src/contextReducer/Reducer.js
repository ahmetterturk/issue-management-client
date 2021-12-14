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
    case 'LOGIN_INFO': {
      return {
        ...state,
        user: action.data,
      };
    }
    case 'LOGOUT': {
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default reducer;
