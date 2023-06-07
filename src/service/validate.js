export const ValidateData = (data) => {
  return Object.keys(data).filter((key) => !data[key]);
};
// ------------ auth ---------
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
export const ValidateRefreshToken = (user) => {
  const { token, refreshToken } = user;
  return ValidateData({ token, refreshToken });
};
// ----------- student ---------
export const ValidateStudent = (student) => {
  const { studentID, studentName, studentDepartment, studentEmail } = student;
  return ValidateData({ studentID, studentName, studentDepartment, studentEmail });
};
export const ValidateUpdateStudent = (student) => {
  const { studentID, studentName, studentDepartment, studentEmail } = student;
  return ValidateData({ studentID, studentName, studentDepartment, studentEmail });
};
// ----------- committee ---------
export const ValidateCommittee = (committee) => {
  const { committeeID,committeeName,committeeDescription,committeeChair, } = committee;
  return ValidateData({ committeeID,committeeName,committeeDescription,committeeChair, });
};
export const ValidateUpdateCommittee = (committee) => {
  const { committeeID,committeeName,committeeDescription,committeeChair, } = committee;
  return ValidateData({ committeeID,committeeName,committeeDescription,committeeChair, });
};
