export const initialState = {
  issues: [],
  profiles: [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: false,
};
