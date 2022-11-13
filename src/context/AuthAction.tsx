type UserActionLoginSuccess = {
  user: string;
};
export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user: UserActionLoginSuccess) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const LoginOut = () => ({
  type: "LOGOUT",
});
