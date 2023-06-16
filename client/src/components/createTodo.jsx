import {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";

const CreateTodo = () => {

    const [data, setData] = useState({"title":"", "description":""})


    // creates new TODO object with same title and description
    const handleChange = (e) => {
        setData((data) => ({ ...data, [e.target.name]: e.target.value}))
    }


    // handles submission for new TODO requests
    const handleSubmit = (e) => {
        e.preventDefault()
        const todo = {
            title: data.title, 
            description: data.description
        }

        console.log({todo})

        axios 
            .post("http://localhost:8000/api/todo", data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
            })
            .catch((err) =>{
                console.log("Could not create Todo")
                console.log(err.message)
            })
    }

  return (
    <>
        <div>
            <Link to="/" className="button-back">
                <button type="button" className="button">
                    back
                </button>
            </Link>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value = {data.title} name = 'title' />
                <input onChange={handleChange} value = {data.description} name = "description" />
                <button type = "submit" >create todo</button>

            </form>
        </div>

    </>
  )
}

export default CreateTodo