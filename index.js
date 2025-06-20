const express=require('express');
const app=express();
const {validateSignup} = require('./Validator/validator');

app.use(express.json());

app.post('/signup', (req, res)=>{
    const {error, value}=validateSignup(req.body);
    if(error){
        return res.status(400).json({
            message:"Sign Up Validation Failed",
            details:error.details.map((err)=>err.message)
        })

    }
    res.status(201).json({
        message:"Sign Up Successful",
        user:value
    });
})
app.delete('/signup', (req, res)=>{
    res.status(200).json({
        message:"Sign Up Deleted Successfully"
    });
});
    

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });