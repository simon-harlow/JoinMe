import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './components/Header/Header'
import Home from "./pages/Home/Home"
import NotFound from './pages/NotFound/NotFound';
import Footer from './components/Footer/Footer';


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

