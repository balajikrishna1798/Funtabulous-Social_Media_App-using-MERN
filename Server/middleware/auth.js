import jwt from 'jsonwebtoken'

export const auth = async(req,res,next) =>{
    try{
        const token = req.headers.authorization&&req.headers.authorization.split(" ")[1]
        const isCustomAuth =  token&&token.length<500
        if(token&&isCustomAuth){
            let decodedData = jwt.verify(token,'test')
            req.userId = decodedData?.id;
        }
        else{
            let decodedData = jwt.decode(token)
            req.userId  = decodedData?.sub;  
        }
        next()
    }
catch(err){
    console.log(err);
}

    
}