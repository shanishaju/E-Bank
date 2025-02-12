//register function

exports.registerController =(req, res)=>{
    const{fname,lname,gender,dateOfBirth,phonenum} = req.body
    console.log(fname,lname,gender,dateOfBirth,phonenum);

    res.status(200).json("register request recieved")
    
}
