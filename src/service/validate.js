import mongoose from "mongoose";

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
  const { studentID, studentName, studentRoom, user_id } = student;
  return ValidateData({ studentID, studentName, studentRoom, user_id });
};

export const ValidateUpdateStudent = (student) => {
  const { studentID, studentName, studentRoom,  } = student;
  return ValidateData({ studentID, studentName, studentRoom,  });
};
// ------------- member ----------
export const ValidateMember = (member) => {
  const { memberID, memberName, memberRoom, user_id } = member;
  return ValidateData({ memberID, memberName, memberRoom, user_id });
};
export const ValidateUpdateMember = (member) => {
  const { memberID, memberName, memberRoom,  } = member;
  return ValidateData({ memberID, memberName, memberRoom,  });
};
// ----------- committee ---------
export const ValidateCommittee = (committee) => {
  const { committeeID,committeeName,committeeDescription,user_id, } = committee;
  return ValidateData({ committeeID,committeeName,committeeDescription,user_id, });
};
export const ValidateUpdateCommittee = (committee) => {
  const { committeeID,committeeName,committeeDescription, } = committee;
  return ValidateData({ committeeID,committeeName,committeeDescription, });
};
// ----------- class room ---------
export const ValidateClass = (classRoom) => {
  const { majorId, room } = classRoom;
  return ValidateData({ majorId,room });
};
export const ValidateUpdateClass = (classRoom) => {
  const { room, department } = classRoom;
  return ValidateData({ room,department });
};
// --------- schedule -------
export const ValidateSchedule = (schedule) => {
  const {  admin_id,major_id,thesis_id,times,committeeName,classRoom,dateTime,schoolYear, } = schedule;
  return ValidateData({ admin_id,major_id,thesis_id,times,committeeName,classRoom,dateTime,schoolYear, });
};
export const ValidateUpdateSchedule = (schedule) => {
  const { thesis_id,times, } = schedule;
  return ValidateData({ thesis_id,times });
};
// ---------- thesis --------
export const ValidateThesis = (thesis) => {
  const {student_id,thesisTitle,proposalFile, } = thesis;
  return ValidateData({ student_id,  thesisTitle,   proposalFile, });
};
export const ValidateUpdateThesis = (thesis) => {
  const { scoringId,thesisTitle,proposalFile,thesisStatus, } = thesis;
  return ValidateData({ scoringId,thesisTitle,proposalFile,thesisStatus, });
};
// ---------- thesisMember --------
export const ValidateThesisMember = (thesisMember) => {
  const { memberId,thesisId,committeeId } = thesisMember;
  return ValidateData({  memberId,thesisId,committeeId });
};
// ---------- scoring --------
export const ValidateScoring = (scoring) => {
  const { /*thesisMemberId ,*/title,point } = scoring;
  return ValidateData({  /*thesisMemberId ,*/title,point });
};
// ---------- resource --------
export const ValidateResourceCode = (resource) => {
  const { thesisId,fileCode } = resource;
  return ValidateData({ thesisId,fileCode });
};
// --------- time -------
export const ValidateTime = (time) => {
  const { major,room } = time;
  return ValidateData({ major,room });
};
// --------- major -------
export const ValidateMajor = (major) => {
  const { fullname,nickname } = major;
  return ValidateData({ fullname,nickname });
};
// ---------- follow -------
export const ValidateFollow = (follow) => {
  const { student_id,thesis_id,committee_id,schoolYear } = follow;
  return ValidateData({ student_id, thesis_id,committee_id,schoolYear });
};
export const ValidateDataFollow = async (follow)=>{
  const {student_id,thesis_id,committee_id} = follow;
  let arrNotFound = [];
  if(!mongoose.Types.ObjectId.isValid(student_id)){
    arrNotFound.push("student_id");
  }
  if(!mongoose.Types.ObjectId.isValid(thesis_id)){
    arrNotFound.push("thesis_id");
  }
  if(!mongoose.Types.ObjectId.isValid(committee_id)){
    arrNotFound.push("committee_id");
  }
  return arrNotFound;
}
// ---------- follow Detail -------
export const ValidateFollowDetail = (followDetail) => {
  const { follow_id,appointment,presentNow,presentEdit, } = followDetail;
  return ValidateData({ follow_id,appointment,presentNow,presentEdit });
};
export const ValidateUpdateFollowDetail = (followDetail) => {
  const { nextAppointment,presentNext, } = followDetail;
  return ValidateData({ nextAppointment,presentNext, });
};
// ----------- thesis schedule ------
export const ValidateThesisSchedule = (thesisSchedule) => {
  const {  admin_id,major_id,thesis_id,committeeName,times,classRoom,dateTime,schoolYear, } = thesisSchedule;
  return ValidateData({  admin_id,major_id,thesis_id,committeeName,times,classRoom,dateTime,schoolYear, });
};
export const ValidateUpdateThesisSchedule = (thesisSchedule) => {
  const {  thesis_id,times, } = thesisSchedule;
  return ValidateData({  thesis_id,times, });
};