//register request

import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const registerApi = async(reqBody)=>{
return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}
export const loginApi = async(reqBody)=>{
  return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}
export const GetBalanceApi = async () => {
  return await commonApi('GET', `${serverUrl}/balance`, "", ""); 
};
export const GetMyProfileApi = async()=>{
  return await commonApi('GET', `${serverUrl}/userdetails`, "", ""); 
}
export const UpdateProfileApi = async (reqBody)=>{
  return await commonApi('PUT',`${serverUrl}/updateprofile`, reqBody, "");
}
export const KycVerificationApi = async (reqBody) => {
  return await commonApi('POST', `${serverUrl}/kycverification`, reqBody, null);
}
