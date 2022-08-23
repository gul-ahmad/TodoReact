import React, { useState } from 'react';
import PropTypes from 'prop-types';
// I have used a libraray knows prop types for checking the prop types ,required check etc
TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

function TodoForm(props) {
  const [todoInput, setTodoInput] = useState('');
  //const [title, setTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState('');
  const [message, setMessage] = useState('');

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }
    props.addTodo(todoInput);
    setTodoInput('');
    setMessage('Todo added successfully');
  }

  return (
    <div>
      <form action="#" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoInput}
          onChange={handleInput}
          className="todo-input"
          placeholder="What do you need to do?"
        />
      </form>
      <div className="message">{message ? <p>{message}</p> : null}</div>
    </div>
  );
}

export default TodoForm;
