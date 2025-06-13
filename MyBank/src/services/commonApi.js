// import axios from "axios"



// export const commonApi  = async(httpRequest, url, reqBody, reqHeader)=>{

//     const reqConfig ={
//         method:httpRequest,
//         url,
//         data:reqBody,
//         headers:reqHeader?reqHeader:{"Content-Type":"application/json"}

//     }

//    return await axios(reqConfig).then((result)=>{
//         return result
//     }).catch((error)=>{
//         return error
//     })
// }
import axios from "axios"


export const commonApi  = async(httpRequest, url, reqBody, reqHeader)=>{
    
    const token = sessionStorage.getItem('token')
      // Check if the URL is NOT login or register
  const isAuthApi = url.includes('/login') || url.includes('/register');
    
   // Default headers with token (only if not login or register)
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && !isAuthApi && { Authorization: token }),
  };
  // If custom headers are passed, merge them with defaults
  const headers = reqHeader ? { ...defaultHeaders, ...reqHeader } : defaultHeaders;

    const reqConfig ={
        method:httpRequest,
        url,
        data:reqBody,
        headers,

    }

   return await axios(reqConfig).then((result)=>{
        return result
    }).catch((error)=>{
        return error
    })
}