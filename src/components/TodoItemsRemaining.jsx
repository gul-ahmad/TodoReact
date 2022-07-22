import React from 'react';
import PropTypes from 'prop-types';
TodoItemsRemaining.propTypes = {
  remaining: PropTypes.func.isRequired,
};

function TodoItemsRemaining(props) {
  return <span>{props.remaining()} Items remaining</span>;
}

export default TodoItemsRemaining;
