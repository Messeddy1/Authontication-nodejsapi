const AllowOrgin = require("./AllowedOrigin")
const corsOptions={
    origin: (origin,callback)=>{
        if (AllowOrgin.indexOf(origin)!==-1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('Origin not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;