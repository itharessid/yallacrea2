const express = require('express');
const mysql =require('mysql')
const cors =require('cors')
const mydb=require( './Config/db' )  
const rout=require("./routes/route")

const app =express()
app.use(cors())
app.use(rout)



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});