import jwt from 'jsonwebtoken'

//next : if we receive any request we need to 
//chek if it has token or not, if there is a 
//token then chek it is valid or not, then next
// will execute every controllers

const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]

        let decodedData = jwt.verify( token, process.env.JWT_SECRET )
        req.userId = decodedData.id

        next()
    }catch(error){
        console.log(error)
    }
}

export default auth