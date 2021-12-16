export const initialState = {
  issues: [],
  profiles: [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  userProfile: null,
  error: false,
};
