export const ValidateData= (data)=>{
    return Object.keys(data).filter((key)=> !data[key])
}
export const ValidateRegister = (user)=>{
    const {username,email,password} = user;
    return ValidateData({username,email,password})
}