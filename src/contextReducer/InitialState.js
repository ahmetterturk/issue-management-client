export const initialState = {
  issues: [],
  profiles: [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  userLoggedIn: false,
  userProfile: JSON.parse(localStorage.getItem('profile')) || null,
  error: false,
};
