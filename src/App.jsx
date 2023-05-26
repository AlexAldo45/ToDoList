import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App" style={{
        display:'grid',
        placeContent: 'center',
        
    }}>
        <div style={{
          display:'grid',
          placeContent: 'center',
          placeItems: 'center',
          margin: '0 20px'
        }}>
          <h1 style={{
            fontFamily:'"Gill Sans", sans-serif',
            textAlign: 'center'
            }}>What's the plan for today?</h1>
          <TodoList />
        </div>
      </div>
    </Provider>
  );
};

export default App;