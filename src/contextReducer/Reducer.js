const reducer = (state, action) => {
  switch (action.type) {
    // set issues, set state of all issues from getIssues request
    case 'GET_ISSUES': {
      return {
        ...state,
        issues: action.data,
      };
    }
    // set users set state of all users from the getUsers request
    case 'GET_USERS': {
      return {
        ...state,
        users: action.data,
      };
    }
    // login info set state for current user from signin request
    case 'LOGIN_INFO': {
      return {
        ...state,
        currentUser: action.data,
      };
    }
    // login success set state of boolean to implement more logic if login is successfull
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    // after logged in state set state to false to remove the current logic after login
    case 'AFTER_LOGGEDIN': {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    // update success set state for is updated to true if any upadate is successful after request
    case 'UPDATE_SUCCESS': {
      return {
        ...state,
        isUpdated: true,
      };
    }
    // after update, set state to false to remove any logic for stop rendering any elelment after update
    case 'AFTER_UPDATE': {
      return {
        ...state,
        isUpdated: false,
      };
    }
    // create success, set state of isCreated to true, if any creating or post request is successfull, will render success message
    case 'CREATE_SUCCESS': {
      return {
        ...state,
        isCreated: true,
      };
    }
    // after create, set state of isCreated to false to stop rendering the crete success messge
    case 'AFTER_CREATE': {
      return {
        ...state,
        isCreated: false,
      };
    }
    // log out will set the currentUser state to the null
    case 'LOGOUT': {
      return {
        ...state,
        currentUser: null,
      };
    }
    // set issues is loading, set state to true, and it will show the circular loading while it loads the data after each request from database
    case 'SET_ISSUESISLOADING': {
      return {
        ...state,
        issuesIsLoading: action.data,
      };
    }
    // increase counter, increase state everytime the dispatch call this case, it mostly used as a dependency to rerender or refetch data from databse
    case 'INCREASE_COUNTER': {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    // set issue members, set state of issue members onChnage, if user choose to assign any other employee to the creating issue, it will have the employee's name, and we can send that to the issue's model member properyt
    case 'SET_ISSUE_MEMBERS': {
      return {
        ...state,
        issueMembers: action.data,
      };
    }
    // set issues update members, set state onChnage the same as above only when the user update the existing issues
    case 'SET_ISSUE_UPDATE_MEMBERS': {
      return {
        ...state,
        issueUpdateMembers: action.data,
      };
    }
    // set assigned issues, set state of assigned issues of any issues has the current user as a member and it's been used to create a notification for the current user
    case 'SET_ASSIGNED_ISSUES': {
      return {
        ...state,
        assignedIssues: action.data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
