import React, { useState, useEffect, useContext, useReducer, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Counter context
const CounterContext = React.createContext();

// Reducer function for managing counter state
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return {...state, count: action.count};
    case 'INCREMENT':
      return {...state, count: state.count + 1 };
    case 'DECREMENT':
      return {...state, count: state.count - 1 };
      case 'MYSET':
        return {...state, mycount : action.mycount};
      case 'MYINCREMENT':
        return {...state, mycount: state.mycount + 1 };
      case 'MYDECREMENT':
        return {...state, mycount: state.mycount - 1 };
    default:
      return state;
  }
};


const Home = () => {
  const { state } = useContext(CounterContext);
  console.log(state);
  return (
    <div>
      <h1>Counter Value: {state.count}</h1>
      <h1>MyCounter Value: {state.mycount}</h1>
    </div>
  );
};

const Counter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchCounter = useCallback(async () => {
    try {
      const response = await axios.get('https://react-hooks-9y1r.vercel.app/api/counter');
      dispatch({ type: 'SET', count: response.data.count });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  

  const incrementCounter = useCallback(async () => {
    try {
      await axios.post('https://react-hooks-9y1r.vercel.app/api/counter/increment');
      dispatch({ type: 'INCREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementCounter = useCallback(async () => {
    try {
      await axios.post('https://react-hooks-9y1r.vercel.app/api/counter/decrement');
      dispatch({ type: 'DECREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {state.count}</p>
      <h2>MyCounter</h2>
      <p>Count: {state.mycount}</p>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};


const MyCounter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchMyCounter = useCallback(async () => {
    try {
      const response = await axios.get('https://react-hooks-9y1r.vercel.app/api/mycounter');
      dispatch({ type: 'MYSET', mycount: response.data.mycount });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMyCounter();
  }, [fetchMyCounter]);

  const incrementMyCounter = useCallback(async () => {
    try {
      await axios.post('https://react-hooks-9y1r.vercel.app/api/mycounter/increment');
      dispatch({ type: 'MYINCREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementMyCounter = useCallback(async () => {
    try {
      await axios.post('https://react-hooks-9y1r.vercel.app/api/mycounter/decrement');
      dispatch({ type: 'MYDECREMENT' });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {state.count}</p>
      <h2>MyCounter</h2>
      <p>Count: {state.mycount}</p>
      <button onClick={incrementMyCounter}>Increment</button>
      <button onClick={decrementMyCounter}>Decrement</button>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};


const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, mycount : 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/mycounter">MyCounter</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/mycounter" element={<MyCounter />} />
          </Routes>
        </div>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;
