let nextTodoId = 0
export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    //https://github.com/airbnb/javascript#es6-object-concise
    text
  }
}

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    //https://github.com/airbnb/javascript#es6-object-concise
    filter
  }
}

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    //https://github.com/airbnb/javascript#es6-object-concise
    id
  }
}
