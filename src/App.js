import React, { useState, useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import { cookie, validateUser } from './apiCall';
import { Examination } from './pages/Exam/Examination';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Reducer } from './reducer/Reducer';
import { Context } from './Context';
import { AUTHENTICATE } from './actions/ActionType';
import { Registration } from "./pages/Registration/Registration";
import { QuestionCard } from './pages/questionCard/QuestionCard';
import { MyExams } from './pages/MyExams/MyExams';
import { Result } from './pages/Result/Result';

function App() {
  const [initialState, setInitialState] = useState({
    signInEnabled: false,
    searchEnabled: false,
    isAuthenticated: false
  });

  useEffect(() => {
    validateAuth();
  }, [])

  const validateAuth = () => {
    validateUser().then(res => {
      if (res.data && res.data.status) {
        cookie.set('Authorization', res.data.authToken);
        dispatch({
          type: AUTHENTICATE,
          payload: {
            isAuthenticated: true
          }
        })
      }
      else {
        cookie.remove('Authorization');
        cookie.remove('type');
        cookie.remove('name');
      }
    })
  }

  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{state, dispatch}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/StudentLogin' element={<Login />} ></Route>
        <Route path='/StudentRegistration' element={<Registration />} ></Route>
        <Route path='/Examination/:examId' element={<Examination />} ></Route> 
        <Route path='/Examination/:examId/Result' element={<Result />} ></Route> 
        <Route path='/Admin/CreateExam' element={<QuestionCard />} ></Route> 
        <Route path='/Examination' element={<MyExams />} ></Route> 
      </Routes>
    </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
