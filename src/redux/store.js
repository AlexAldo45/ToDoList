import {legacy_createStore as createStore} from 'redux'

// Definisikan aksi-aksi Redux
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_FILTER = 'SET_FILTER';

// Definisikan aksi tambah Todo
export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    payload: text,
  };
};

// Definisikan aksi hapus Todo
export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    payload: id,
  };
};

// Definisikan aksi edit Todo
export const editTodo = (id, text) => {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      text,
    },
  };
};

// Definisikan aksi toggle Todo
export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    payload: id,
  };
};

// Definisikan aksi set filter
export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    payload: filter,
  };
};

// Definisikan initial state
const initialState = {
  todos: [],
  filter: 'all',
};

// Definisikan reducer
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

// Buat store Redux
const store = createStore(todoReducer);

export default store;