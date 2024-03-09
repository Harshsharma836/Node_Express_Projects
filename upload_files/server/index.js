const express = require('express')
const app = express();
const multer = require('multer')
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.get('/', (req,res)=>{
    res.status(200).send({msg : "Hello"})
})

// This is a Storage Object
const storage = multer.diskStorage({
    destination : function(req, file, cb){ // cb is a callback which define error and folder path
        return cb(null , './uploads')
    }, 
    filename : function(req, file, cb){
        return cb(null , `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage})

app.post('/upload',upload.single('profileImage') ,(req,res)=>{
    console.log(req.body);
    console.log(req.file);
})

app.listen(3001, ()=>{
    console.log('server running on 3001')
})