import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios'

import './App.scss';

import { API_URL } from "./components/Utils/const";
import Menu from './components/Menu/Menu';
import AllEvents from './components/AllEvents/AllEvents';
import EventForm from './components/EventForm/EventForm';
import EventDetails from './components/EventDetails/EventDetails';
import Profile from './components/Profile/Profile';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/users/4780c8ef-6659-4f56-a6ea-cd0486a39f59`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Menu userData={userData} />
        <main className="content-container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            {userData && (
              <Route path={`/users/${userData.id}`} element={<Profile userData={userData} />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<AllEvents userData={userData}/>} />
            <Route path="/events/new" element={<EventForm userData={userData}/>} />
            <Route path="/events/edit/:eventId" element={<EventForm userData={userData}/>} />
            <Route path="/events/:eventId" element={<EventDetails userData={userData}/>} />
            <Route path={`/users/:userId`} element={<Profile />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;