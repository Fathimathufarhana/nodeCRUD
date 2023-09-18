import express from "express"
import mongoose from "mongoose";
 
const socialmedia = express()
const port = 6000

socialmedia.use(express.json())

socialmedia.get('/api/socialmedia/:id',async(req,res) =>{
    const id = req.params
    let result1 =new mongoose.Types.ObjectId(id)
    let result = await mongoose.connection.collection("user").findOne({_id: result1})
    console.log(result);
    res.json(result)
})

socialmedia.get('/api/socialmedia',async(req,res) => {
    let result = await mongoose.connection.collection("user").find().toArray()
    console.log(result);
    res.json(result)
})

socialmedia.post('/api/socialmedia',(req,res) => {
    // console.log("post method");
    const {username,email,password,mobilenumber} = req.body
    mongoose.connection.collection("user").insertOne({username :username , email : email , password :password , mobilenumber :mobilenumber})
    res.json("posted")
    //    console.log(username,email,password,mobilenumber);
})

socialmedia.put('/api/socialmedia/:id',(req,res) => {
    const id = req.params
    let result =new mongoose.Types.ObjectId(id)
    console.log(result);
    mongoose.connection.collection("user").updateOne({_id : result},{
        $set:{
            username : req.body.username,
            password : req.body.password,
            email : req.body.email,
            mobilenumber : req.body.mobilenumber
        }
    })
    res.json("updated")
})


socialmedia.delete('/api/socialmedia/:id',(req,res) => {
    const id = req.params
    let result = new mongoose.Types.ObjectId(id)
    console.log(result);
    mongoose.connection.collection("user").deleteOne({_id : result})
    res.json("deleted")
})
const connectmongodb = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/socialmedia').then(() =>{
        console.log("mongodb connected");
    }).catch((err) => console.log(err.message));
}

socialmedia.listen(port,() => {
    console.log(`port is ${port}`);
    connectmongodb()
})