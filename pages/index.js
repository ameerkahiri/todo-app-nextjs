import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../containers/addTodo";
import TodoList from "../containers/todoList";
import axios from "axios";

export default function Home() {

  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(/*"http://localhost:3000/api/to-dos"*/"https://strapitodo.as.r.appspot.com/api/to-dos");
      setTodos(result?.data.data);
    };
    fetchData()
    .catch(console.error);
  }, []);


  const addTodo = async (todotext) => {
    if (todotext && todotext.length > 0) {
      const result = await axios.post(/*"http://localhost:3000/api/to-dos"*/"https://strapitodo.as.r.appspot.com/api/to-dos", {
        "data": {
          ToDoText: todotext,
        }
      });
      setTodos([...todos, result?.data.data]);
    }
  };


  const deleteTodoItem = async (todo) => {
    if (confirm("Do you really want to delete this item?")) {
      await axios.delete(/*"http://localhost:3000/api/to-dos/"*/"https://strapitodo.as.r.appspot.com/api/to-dos/" + todo.id);
      const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
      console.log(newTodos);
      setTodos(newTodos);
    }
  };


  const editTodoItem = async (todo) => {
    const newTodoText = prompt("Enter new todo text or description:");
    if (newTodoText != null) {
      const result = await axios.put(/*"http://localhost:3000/api/to-dos/"*/"https://strapitodo.as.r.appspot.com/api/to-dos/" + todo.id, {
        "data": {
          ToDoText: newTodoText,
        }
      });
      const moddedTodos = todos.map((_todo) => {
        if (_todo.id === todo.id) {
          return result?.data.data;
        } else {
          return _todo;
        }
      });
      setTodos(moddedTodos);
    }
  };

  
  return (
    <div>
      <Head>
        <title>ToDo app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main">
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
        />
      </main>
    </div>
  );
}