import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router';
import { MainPage } from './pages/MainPage/MainPage';
import { Epicentr } from './pages/Epicentr/Epicentr';
import { Rozetka } from './pages/Rozetka/Rozetka';
import { Hotline } from './pages/Hotline/Hotline';
import { WordParser } from './pages/WordParser/WordParser';
import { Allo } from './pages/Allo/Allo';
import { TelegramBot } from './pages/TelegramBot/TelegramBot';

const App = () => {
  return (
     <BrowserRouter>
    <Navbar>
      <Routes>
        <Route path="/settings/epicentr" element={<Epicentr />}></Route>
        <Route path="/settings/hotline" element={<Hotline />}></Route>
        <Route path="/settings/rozetka" element={<Rozetka />}></Route>
        <Route path="/settings/allo" element={<Allo />}></Route>
        <Route path="/tel-bot" element={<TelegramBot />}></Route>
        <Route path="/word-parser" element={<WordParser />}></Route>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
  </Navbar>
    </BrowserRouter>
  )
}

export default App;