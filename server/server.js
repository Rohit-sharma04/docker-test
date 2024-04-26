
import express from 'express';
import cors from 'cors';
import TodoModel from './model/todo.model.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv'

//dotenv conig 
dotenv.config()


//mongodb connection
await connectDB();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/api/get', async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json({todos,success:true});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error', success:false });
  }
});

app.post('/api/add', async (req, res) => {
  try {
    const {title,author,publisher,copies}= req.body;
    const todo = new TodoModel({ 
      title,
      author,
      publisher,
      copies, });
    await todo.save();
    console.log(todo);
    res.status(201).json({ success: true, todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
