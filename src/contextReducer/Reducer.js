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
        userLoggedIn: true,
      };
    }
    case 'LOGIN_FAILURE': {
      return {
        ...state,
        user: false,
        userLoggedIn: false,
        error: true,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        user: null,
        userLoggedIn: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
