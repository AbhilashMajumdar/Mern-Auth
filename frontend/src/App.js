import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Signin from './components/Signin';
import Login from './components/Login';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import Welcome from './components/Welcome';
import { useSelector } from 'react-redux';

const App = () => {

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          {
            isLoggedIn &&
            <Route path='/welcome' element={<Welcome />} />
          }
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
