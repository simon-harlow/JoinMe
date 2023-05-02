import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.scss'

import Menu from './components/Menu/Menu'
import Welcome from './components/Welcome/Welcome'
import AllEvents from './components/AllEvents/AllEvents'
import Event from './components/Event/Event'
import Profile from './components/Profile/Profile'
import NotFound from './pages/NotFound/NotFound';


function App() {

  return (
    <BrowserRouter>
      <div className="app-container">
        <Menu />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/events/:eventId" element={<Event />} />
            <Route path="/user/:userId" element={<Profile />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;