import { useEffect, useState } from "react";
import axios from 'axios'

function App() {
  const [showTextBoxes1, setShowTextBoxes1] = useState(false);
  const [showTextBoxes2, setShowTextBoxes2] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    publisher: '',
    author: '',
    copies: '',
  });
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
   console.log(formData)
    axios.post('http://localhost:5000/api/add', formData)
     .then((response) => {
        console.log(response);
      })
     .catch((error) => {
        console.error(error);
      });
  };
console.log("data",todos)

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value });
  };
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get');
      if (response.data.success) {
        console.log(response.data.todos);
        setTodos(response.data.todos);
        fetchTodos();
      } else {
        console.log('Error fetching todos:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  // const createConnection=()=>{
  //   axios.get('http://localhost:5000/checkConnection')
  // }
  return (
    <>
      <div className="flex">
      {/* <button onClick={createConnection}>create connection</button> */}
        <button className="bg-blue-300 m-5" onClick={() => setShowTextBoxes1((prev) => !prev)}>enter Book</button>
        {showTextBoxes1 && (
          <div className="flex flex-col m-6 ">
          <form onSubmit={handleSubmit}>
      <label>
        title
        <input type="text" name="title" value={formData.field1} onChange={handleChange} />
      </label>
      <br />
      <label>
        publisher
        <input type="text" name="publisher" value={formData.field2} onChange={handleChange} />
      </label>
      <br />
      <label>
        author:
        <input type="text" name="author" value={formData.field3} onChange={handleChange} />
      </label>
      <br />
      <label>
        copies:
        <input type="text" name="copies" value={formData.field4} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
          </div>)}

        <button className="bg-blue-300 m-5" onClick={() => setShowTextBoxes2((prev) => !prev)}>view Book</button>
        {showTextBoxes2 && (
          <div className="flex flex-col m-6 ">
          <ul>
        {todos.map(todo => (
          <div key={todo._id}>
          <li >
            {todo.title}
          </li>
          </div>
          
        ))}
      </ul>
          </div>)}
      </div>
    </>
  )
}

export default App
