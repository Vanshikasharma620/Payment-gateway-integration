const express = require('express')
const path = require('path')
const app = express()
const port =process.env.PORT ||  3000;
const pathname=path.join(__dirname + "/public")
const mongoose= require('mongoose')
MongoDbURL="mongodb+srv://lms:vanshika@cluster0.ex4nl.mongodb.net/spark?retryWrites=true&w=majority";
mongoose.connect(MongoDbURL);
var db=mongoose.connection;
db.on('error',console.error.bind(console,"Connection error : "))
db.once('open' , function (){
    console.log(" ")
});
const kittySchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    mssg:String
  });

  app.use(express.static(pathname))
  app.use(express.json())
  app.use(express.urlencoded({extended:false}))
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(pathname + "/index.html"))
    res.status(500);
})
  app.get('/order', (req, res) => {
    res.sendFile(path.join(pathname + "/order.html"))
    res.status(500);
})

app.post("/log" , (req,res)=>{
    const Kitten = mongoose.model('foodapp', kittySchema);
    const fluffy = new Kitten({ name : req.body.name , email : req.body.email , phone : req.body.phone , mssg : req.body.mssg});
    fluffy.save();
    console.log(fluffy)
    res.redirect('/')
    res.status(500);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })