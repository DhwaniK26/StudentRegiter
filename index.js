const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const PORT = 5000;
var App = express();

App.use(cors({origin: 'http://localhost:3000'}));
App.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/firstdb');

const myschema = new mongoose.Schema({
  name: String,
  enroll:String
})

const Student = mongoose.model("Student",myschema);

App.post('/', async (req, res) => {
  const user = new Student({
    name: req.body.name,
    enroll: req.body.enroll,
    });
    
   const student = await Student.findOne({ enroll: user.enroll });
   if(student){
    res.json({
      message:"already there !!"
    })  
   }else{
     user.save()
     res.json({
      message:"saved!!"
    })
   }
  
});


App.get('/',async (req,res)=>{
   const user = await Student.find({});
   res.json(user);
});

App.delete('/', async (req,res)=>{
  const enroll = req.body.enroll;

  const student = await Student.findOne({ enroll: enroll });

  // Retrieve the _id from the found document
  const studentId = student._id;

  // Use the retrieved _id to delete the document
  const result = await Student.deleteOne({ _id: studentId });

  if(result){
    res.json({
      message:'success delete'
    })
  }
  
});

App.patch('/', async(req, res)=>{
  const enroll = req.body.enroll;
  const name = req.body.name;

  const user = await Student.updateOne({enroll:enroll},{name:name});
  const student = await Student.findOne({ enroll: user.enroll });
  if(student){
   res.json({
     message:"already there !!"
   })  
  }else{
    user.save()
    res.json({
     message:"updated!!"
   })
  }
  
})


App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

