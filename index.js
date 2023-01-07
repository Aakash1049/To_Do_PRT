const express=require("express")
const mongodb=require("mongodb")
const mongoose= require("mongoose")
const app=express()
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"config.env"})
}
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to database")
})

const user=require("./routes/user")
app.use(user)

if (process.env.NODE_ENV === 'production') {
    //*Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }



app.listen(process.env.PORT || 5000,()=>{
    console.log("server is running at 5000")
})