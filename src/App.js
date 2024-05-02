import React, { useState, useEffect } from 'react';
import deleteImage from "./Images/delete.jpg";
import editImage from "./Images/edit.jpg";
import './App.css'


function App() {
  const [todos, setTodos] = useState ([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };



  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const editTodo = (index) => {
    setEditingIndex(index);
    setInputValue(todos[index]);
  };

  const updateTodo = () => {
    if (inputValue.trim() !== '') {
      const updatedTodos  = [...todos];
      updatedTodos[editingIndex] = inputValue;
      setTodos(updatedTodos);
      setInputValue('');
      setEditingIndex(null);
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 86400000); // Update every 24 hours (24 * 60 * 60 * 1000 milliseconds)

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);


  function formatDate(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  return (
   <div>
    <div className="header">

      <div className="date">
      <h4>{formatDate(currentDate)}</h4>
      <p>{todos.length} Active Tasks</p>
      </div>

      <div className="title">
      <h1>Todo List</h1>
      </div>
    </div>
   
   
    <input
        type="text"
        placeholder={isFocused ? '' : 'Enter your todo-list'}
        sty
        className="myInput"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
    />

{editingIndex !== null ? (
   <button  className="addButton" onClick={updateTodo}>Update Todo List</button>
) : (
    <button className="addButton" onClick={addTodo}>Add</button>
)}
<table className="list">
  <tbody>
    {todos.map((todo, index) => (
      <tr key={index} className="todo-items">
        <td>{todo}</td>
        <td>
          <img onClick={() => deleteTodo(index)} src={deleteImage} alt="Delete" className="todo-action" />
          <img onClick={() => editTodo(index)} src={editImage} alt="Edit" className="todo-action" />
        </td>
      </tr>
    ))}
  </tbody>
</table>


   </div>   
  );
}

export default App;
