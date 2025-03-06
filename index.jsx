import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import './headerandfooter.css'

import Header from './src/Header'
import Footer from './src/Footer'
import Login from './src/Login'
import AtAGlance from './src/at_a_glance/AtAGlance'
import Tutorial from './src/Tutorial'
import Setup from './src/Setup'

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