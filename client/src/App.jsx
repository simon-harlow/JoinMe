import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './components/Header/Header'
// import Login from "./pages/Login/Login"
import NotFound from './pages/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

