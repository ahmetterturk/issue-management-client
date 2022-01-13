export const initialState = {
  issues: [],
  users: [],
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  counter: 0,
  isLoggedIn: false,
  isUpdated: false,
  isCreated: false,
  issuesIsLoading: false,
  issueMembers: [],
  issueUpdateMembers: [],
  assignedIssues: [],
};
