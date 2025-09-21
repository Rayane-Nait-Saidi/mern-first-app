//backend
const express = require('express') ; 
const mongoose = require('mongoose') ; 
const app = express() ; 
const cors = require('cors') ;

require("dotenv").config();

app.use(cors()) ; 
app.use(express.json()) ; 
async function run() {
    try{
       await mongoose.connect(process.env.MONGO_URI) ;
       console.log("Connected ✅") ;
       const Schema = new mongoose.Schema({
         username:String , 
         email:String , 
         password:String , 
         tasks:Array
       }) ;   

       const accounts = mongoose.model("accounts",Schema) ; 

       let account_info = {} ; 

       app.post('/api/accounts', async (req, res) => {
       const {username, email, password} = req.body;
       await accounts.create({username, email, password, tasks: []});
       account_info = {username , password} ;  
       let array = await accounts.find({}, {_id:0, __v:0});
       res.json(array);
       });


       app.get('/api/accounts',async(req,res)=>{
         const {username , password} = req.query ;
         const find_account = await accounts.findOne({$and:[{username:username},{password:password}]}) ; 
         if (find_account){
            res.json({found:"Account Found!"}) ;
            account_info = {username , password} ; 
         }
         else{
            res.json({error:"Account not found!"});
         }
       }) ; 

       app.put('/api/accounts/tasks',async(req,res)=>{
         const {task} = req.body ; 
         let aaa = await accounts.findOne({username:account_info.username,password:account_info.password}) ; 
         aaa.tasks.push(task) ; 
         let newarray = aaa.tasks ; 
         await accounts.updateOne({username:account_info.username , password:account_info.password},{$set:{tasks:newarray}}) ;
         res.json({reply:"Done:"}) ;  
       }) ; 

       app.get('/api/accounts/tasks',async(req,res)=>{
          const get_account = await accounts.findOne({username:account_info.username,password:account_info.password}) ;
          res.json(get_account) ; 
       }) ;
       
       app.put('/api/accounts/notesarray',async(req,res)=>{
          const {note} = req.query ; 
          let bbb = await accounts.findOne({username:account_info.username,password:account_info.password}) ; 
          let array2 = bbb.tasks.filter((elt)=>{
            return elt != note ; 
          }) ; 

          await accounts.updateOne({username:account_info.username,password:account_info.password},{$set:{tasks:array2}}) ;
          res.json({reply:"Done!"}) ; 
       }) ;
       
       app.get('/api/accounts/find',async(req,res)=>{ 
         let found_account1 = await accounts.findOne({username:account_info.username , password:account_info.password}) ;
         res.json(found_account1) ; 
       }) ;

       app.delete('/api/accounts',async(req,res)=>{
         await accounts.deleteOne({username:account_info.username , password:account_info.password}) ; 
         res.json({reply:"Deleted!!"}) ; 
       }) ; 

       app.listen(5000,()=>{
        console.log("Server listening on port 5000...") ;
       }) ; 
    }catch{
       console.log("Error ❌") ; 
    }
}

run() ;