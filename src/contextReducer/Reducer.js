const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ISSUES': {
      return {
        ...state,
        issues: action.data,
      };
    }
    case 'GET_USERS': {
      return {
        ...state,
        users: action.data,
      };
    }
    case 'LOGIN_INFO': {
      return {
        ...state,
        currentUser: action.data,
      };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case 'AFTER_LOGGEDIN': {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    case 'UPDATE_SUCCESS': {
      return {
        ...state,
        isUpdated: true,
      };
    }
    case 'AFTER_UPDATE': {
      return {
        ...state,
        isUpdated: false,
      };
    }
    case 'CREATE_SUCCESS': {
      return {
        ...state,
        isCreated: true,
      };
    }
    case 'AFTER_CREATE': {
      return {
        ...state,
        isCreated: false,
      };
    }
    case 'LOGIN_FAILURE': {
      return {
        ...state,
        currentUser: false,
        error: true,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        currentUser: null,
      };
    }
    case 'INCREASE_COUNTER': {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    case 'SET_ISSUE_MEMBERS': {
      return {
        ...state,
        issueMembers: action.data,
      };
    }
    case 'SET_ISSUE_UPDATE_MEMBERS': {
      return {
        ...state,
        issueUpdateMembers: action.data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
