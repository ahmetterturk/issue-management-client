export const initialState = {
  issues: [],
  profiles: [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  userProfile: JSON.parse(localStorage.getItem('profile')) || null,
  error: false,
};
