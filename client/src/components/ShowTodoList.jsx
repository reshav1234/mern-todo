import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateTodo from './updateTodo'

function TodoCard({ data, handleDelete, handleEdit }) {
    const { _id, title, description } = data;
    return (
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
                <button className="button" name={_id} onClick={handleEdit}>edit</button>
                <button className="button" name={_id} onClick={handleDelete}>delete</button>
            </div>
        </li>
    );
}

const ShowTodoList = () => {
    const [todos, setTodos] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState("");
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/todo")
        .then((res) => {
          console.log(res.data);
          setTodos(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    const handleDelete = (e) => {
      const todoId = e.target.name;
  
      axios
        .delete(`http://localhost:8000/api/todo/${todoId}`)
        .then((res) => {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const handleEdit = (e) => {
      const todoId = e.target.name;
      setEditId(todoId);
      setOpen(true);
    };
  
    const handleUpdate = (updatedTodo) => {
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo._id === updatedTodo._id) {
            return updatedTodo;
          }
          return todo;
        });
      });
    };
  
    const handleClose = () => {
      setEditId("");
      setOpen(false);
    };
  
    return (
      <section className="container">
        <Link to="/create" className="button-new">
          <button className="button">New</button>
        </Link>
        <section className="contents">
          <h1>TODO</h1>
          <ul className="list-container">
            {todos.map((data) => (
              <TodoCard
                key={data._id}
                data={data}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        </section>
        {open && (
          <div>
            <p onClick={handleClose}>&times;</p>
            <UpdateTodo
              _id={editId}
              handleClose={handleClose}
              handleUpdate={handleUpdate}
            />
          </div>
        )}
      </section>
    );
  };
  

export default ShowTodoList;
