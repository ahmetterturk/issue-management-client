export const initialState = {
  issues: [],
  users: [],
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  error: false,
};
