import React from 'react';
import PropTypes from 'prop-types';
TodoCompleteAllTodos.propTypes = {
  completeAllTodos: PropTypes.func.isRequired,
};

function TodoCompleteAllTodos(props) {
  return (
    <div className="button" onClick={props.completeAllTodos}>
      Check All
    </div>
  );
}

export default TodoCompleteAllTodos;
