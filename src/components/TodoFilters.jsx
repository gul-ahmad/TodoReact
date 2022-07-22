import React from 'react';

import PropTypes from 'prop-types';
TodoFilters.propTypes = {
  filter: PropTypes.string.isRequired,
  todosFiltered: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

function TodoFilters(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.setFilter('all');
          props.todosFiltered('all');
        }}
        className="button filter-button filter-button-active"
      >
        All
      </button>
      <button
        onClick={() => {
          props.setFilter('active');
          props.todosFiltered('active');
        }}
        className={`button filter-button  ${
          props.filter === 'active' ? 'filter-button-active' : ''
        }  `}
      >
        Active
      </button>
      <button
        onClick={() => {
          props.setFilter('completed');
          props.todosFiltered('completed');
        }}
        className={`button filter-button  ${
          props.filter === 'completed' ? 'filter-button-active' : ''
        }  `}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;
