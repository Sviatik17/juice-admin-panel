const express = require('express');
const app=express();
const PORT = 3000;
const path = require('path');
const fs = require('fs')

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const storageFilePath =path.join(__dirname,'storage.json');

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})
app.get('/api/data',(req,res)=>{
    const data =readData();
    if(data){
        res.json(data);
    }else{
        res.status(500).json({error:'Unable to read data'})
    }
})
app.post('/saveOrder',(req,res)=>{
    const newData=req.body;
    console.log(newData)
})




app.listen(PORT,()=>{
    console.log(`Server work on port :${PORT}`)
})


const readData = ()=>{
    try{
        const data = fs.readFileSync(storageFilePath,'utf8');
        return JSON.parse(data);
    }catch(error){
        console.error(`Error rearing data :${error}`);
        return null;
    }
}