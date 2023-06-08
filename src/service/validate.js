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
// ----------- class room ---------
export const ValidateClass = (classRoom) => {
  const { room, department } = classRoom;
  return ValidateData({ room,department });
};
export const ValidateUpdateClass = (classRoom) => {
  const { room, department } = classRoom;
  return ValidateData({ room,department });
};
// --------- schedule -------
export const ValidateSchedule = (schedule) => {
  const {   scheduleDate,scheduleLocation, committeeId,thesisId,classId, } = schedule;
  return ValidateData({   scheduleDate,scheduleLocation, committeeId,thesisId,classId, });
};
export const ValidateUpdateSchedule = (schedule) => {
  const {   scheduleDate,scheduleLocation, committeeId,thesisId,classId, } = schedule;
  return ValidateData({   scheduleDate,scheduleLocation, committeeId,thesisId,classId, });
};
// ---------- thesis --------
export const ValidateThesis = (thesis) => {
  const { scoringId,studentId,thesisTitle,thesisDetail,thesisAbstract,thesisFile,thesisStatus, } = thesis;
  return ValidateData({ scoringId,studentId,thesisTitle,thesisDetail,thesisAbstract,thesisFile,thesisStatus, });
};
export const ValidateUpdateThesis = (thesis) => {
  const { scoringId,studentId,thesisTitle,thesisDetail,thesisAbstract,thesisFile,thesisStatus, } = thesis;
  return ValidateData({ scoringId,studentId,thesisTitle,thesisDetail,thesisAbstract,thesisFile,thesisStatus, });
};