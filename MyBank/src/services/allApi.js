//register request

import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const registerApi = async(reqBody)=>{
  return await commonApi('POST',`${serverUrl}/register`,reqBody,"")

}