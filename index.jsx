import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import './headerandfooter.css'

import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import AtAGlance from './components/at_a_glance/AtAGlance'
import Tutorial from './components/Tutorial'
import Setup from './components/Setup'

function Demo() {
  const [bgColor, setBgColor] = React.useState('white');

  const handleClick = () => {
    setBgColor(bgColor === 'white' ? 'yellow' : 'white');
  };
  return (
    <main>
      <div
        onClick={handleClick}
        style={{ backgroundColor: bgColor, height: '100vh', font: 'bold 20vh Arial', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div> Hello React </div>
      </div>
    </main>
 )
}

function App() {
  return (
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/ataglancePage" element={<AtAGlance />} />
            <Route path="/setupPage" element={<Setup />} />
            <Route path="/tutorialPage" element={<Tutorial />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
        <Footer />
      </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);