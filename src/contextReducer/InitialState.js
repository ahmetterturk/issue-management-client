export const initialState = {
  issues: [],
  users: [],
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  error: false,
  counter: 0,
  isLoggedIn: false,
  isUpdated: false,
  isCreated: false,
  issueMembers: [],
  issueUpdateMembers: [],
};
