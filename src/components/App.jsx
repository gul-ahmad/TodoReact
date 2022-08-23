import { useEffect, useState } from 'react';
import NoTodos from './NoTodos';
import '../reset.css';
import '../App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

// function pow(x, n) {
//   let result = x;

//   for (let i = 1; i < n; i++) {
//     result *= x;
//   }
//   return result;
// }
// let x = prompt('x?', 'Please enter value for x');
// let n = prompt('n?', 'Please enter value for n');
// if (n < 1) {
//   alert(`Power of {n} is not supported,please use positve`);
// } else {
//   alert(pow(x,n));
// }

function App() {
  const [todos, setTodos] = useState([
    // {
    //   id: 1,
    //   title: 'Finish React Series',
    //   isCompleted: false,
    //   isEditing: false,
    // },
    // {
    //   id: 2,
    //   title: 'Go to Cu Office',
    //   isCompleted: false,
    //   isEditing: false,
    // },
    // {
    //   id: 3,
    //   title: 'Go to Namaz',
    //   isCompleted: true,
    //   isEditing: false,
    // },
  ]);

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(results => {
        //console.log(results);
        setTodos(results);
      });
  }, []);

  const [idForTodo, setIdForTodo] = useState();

  async function addTodo(todo) {
    //alert(todo);
    // setTodos([
    //   ...todos,
    //   {
    //     id: 4,
    //     title: todo,
    //     isCompleted: false,
    //   },
    // ]);
    try {
      let res = await fetch('http://localhost:5000/add-todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: todo,
          isCompleted: 'false',
        }),
      }).then(response => {
        console.log(response);
      });
      let resJson = res.json();

      // alert(res.title);
      //  setTodos([...todos],resJson.id);

      console.log(resJson);
      //setTodos(res);

      if (res.status === 200) {
        // setName("");
        // setEmail("");
        // setMobileNumber("");
        // setMessage("User created successfully");
        // alert('saved successfully');
      } else {
        // alert('Problem happened');
        // setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }

    // setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
    //  console.log('deleting id' +id);

    //we are using filter method to not mutate/disturb the orignal array
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function completeTodo(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isCompleted = true;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });
    setTodos(updatedTodos);
  }
  function updateTodo(event, id) {
    const updatedTodos = todos.map(todo => {
      if (event.target.value.trim().length === 0) {
        todo.isEditing = false;
        return todo;
      }
      if (todo.id === id) {
        todo.title = event.target.value;
        todo.isEditing = false;
      }

      return todo;
    });
    setTodos(updatedTodos);
  }

  function cancelEdit(event, id) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });
    setTodos(updatedTodos);
  }
  function remaining() {
    return todos.filter(todo => !todo.isCompleted).length;
  }
  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isCompleted));
  }
  function completeAllTodos() {
    const updatedTodos = todos.map(todo => {
      todo.isCompleted = true;

      return todo;
    });

    setTodos(updatedTodos);
  }
  function todosFiltered(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isCompleted);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isCompleted);
    }
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        {/* <> below this is added as a root element we can add a div as well instead ,but this is know as fragment */}
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
            deleteTodo={deleteTodo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
