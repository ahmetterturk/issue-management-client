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
        profiles: action.data,
      };
    }
    case 'CURRENT_PROFILE': {
      return {
        ...state,
        userProfile: action.data,
      };
    }
    case 'LOGIN_INFO': {
      return {
        ...state,
        user: action.data,
      };
    }
    case 'LOGOUT': {
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
