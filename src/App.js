import { useReducer, useState } from "react";
import Todo from './Todo';

export const ACTIONS = {
  ADD: 'add',
  TOGGLE: 'toggle',
  DELETE: 'delete'
}
function reducer(todos, action) {
  switch(action.type) {
    case ACTIONS.ADD:
      return [ ...todos, {id:Date.now(), name: action.payload.name, complete:false} ];
    case ACTIONS.TOGGLE:
      return todos.map(todo => {
        if ( todo.id === action.payload.id )
          return { ...todo, complete: !todo.complete };
        return todo;
      });
    case ACTIONS.DELETE:
      return todos.filter(todo => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function App() {
  const [ todos, dispatch ] = useReducer( reducer, [] );
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch( { type: ACTIONS.ADD, payload: { name: name } } );
    setName('');
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ name } onChange={ e => setName( e.target.value ) } />
      </form>
      { todos.map(todo => <Todo key={todo.id} todo={todo} dispatch={dispatch} />) }
    </>
  );
}

export default App;
