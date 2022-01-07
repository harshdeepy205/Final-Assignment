const express=require('express')
const fast2sms=require('fast-two-sms')
const cors=require('cors')

const app=express()
require("dotenv").config();

app.use(express.json({ extended: false }));


app.use(cors())
app.use("/payment", require("./routes/payment"));
app.use(express.json())
app.post('/sendmessage',async (req,res)=>{
    console.log(req.body)
   const response=await  fast2sms.sendMessage({authorization:process.env.API_KEY,message:req.body.message,numbers:[req.body.number]})
    res.send(response)
})

app.get('/',(req,res)=>{
    res.render('index.ejs')
})




app.listen(5000,()=>{
    console.log("Server is started")
})