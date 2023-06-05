export const ValidateData = (data) => {
  return Object.keys(data).filter((key) => !data[key]);
};
export const ValidateRegister = (user) => {
  const { username, email, password } = user;
  return ValidateData({ username, email, password });
};
export const ValidateLogin = (user) => {
  const { email, password } = user;
  return ValidateData({ email, password });
};
export const ValidateForget = (user) => {
    const { email, newpassword } = user;
    return ValidateData({ email, newpassword });
  };
