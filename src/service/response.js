export const SendCreate = (res, message, data) => {
  res.status(201).json({ staus: true, message, data }); // status create
};
export const SendSuccess = (res, message, data) => {
  res.status(200).json({ staus: true, message, data }); // status ok,put,delete,get
};
export const SendError400 = (res, message, error) => {
  res.status(400).json({ staus: false, message, data: {}, error }); // Bad Request
};
export const SendError401 = (res, message, error) => {
    res.status(401).json({ staus: false, message, data: {}, error }); // UnAuthorization
  };
export const SendError404 = (res, message, error) => {
  res.status(404).json({ staus: false, message, data: {}, error }); // status Not Found
};
export const SendError500 = (res, message, error) => {
    res.status(500).json({ staus: false, message, data: {}, error }); // Error Server Internal 
  };
