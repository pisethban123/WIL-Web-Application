import express from "express";
import connectDB from "./src/config/db.js"; 
import dotenv from 'dotenv';
import itemmodel from './src/models/user.js';
import cors from "cors";



dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())
connectDB()

app.get('/' , (req, res) => { const items = itemmodel.find()
    res.json(items)
})
app.listen(3001, () => {
    console.log('Server is running on port 3001')
})