import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAllTodos from './TodoCompleteAllTodos';
import TodoFilters from './TodoFilters';
// I have used a libraray knows prop types for checking the prop types ,required check etc
TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  markAsEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  remaining: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  completeAllTodos: PropTypes.func.isRequired,
  todosFiltered: PropTypes.func.isRequired,
};
/* <> below this is added as a root element we can add a div as well instead ,but this is know as fragment */
function TodoList(props) {
  const [filter, setFilter] = useState('all');

  return (
    <>
      <ul className="todo-list">
        {props.todosFiltered(filter).map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => props.completeTodo(todo.id)}
                checked={todo.isCompleted ? true : false}
              />
              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => props.markAsEditing(todo.id)}
                  className={`todo-item-label  ${
                    todo.isCompleted ? 'line-through' : ''
                  }  `}
                >
                  {todo.title}
                </span>
              ) : (
                <input
                  type="text"
                  className="todo-item-input"
                  defaultValue={todo.title}
                  autoFocus
                  onBlur={event => props.updateTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      props.updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      props.cancelEdit(event, todo.id);
                    }
                  }}
                />
              )}
            </div>
            <button
              onClick={() => props.deleteTodo(todo.id)}
              className="x-button"
            >
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="check-all-container">
        <div>
          <TodoCompleteAllTodos completeAllTodos={props.completeAllTodos} />
        </div>

        <TodoItemsRemaining remaining={props.remaining} />
      </div>

      <div className="other-buttons-container">
        <TodoFilters
          filter={filter}
          todosFiltered={props.todosFiltered}
          setFilter={setFilter}
        />

        <div>
          <TodoClearCompleted clearCompleted={props.clearCompleted} />
        </div>
      </div>
    </>
  );
}

export default TodoList;
