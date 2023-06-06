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
export const ValidateChangePassword = (user) => {
  const { oldPassword, newPassword } = user;
  return ValidateData({ oldPassword, newPassword });
};
export const ValidateUpdateProfile = (user) => {
  const { username, email } = user;
  return ValidateData({ username, email });
};
export const ValidateUpdateProfileImage = (user) => {
  const {  image } = user;
  return ValidateData({  image  });
};