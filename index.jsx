import React from 'react';
import ReactDOM from 'react-dom/client';
import './headerandfooter.css'

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
    <div>
      <Header />
      <Demo />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
        <nav>
            <a href="#">Schedulify</a>
            <menu>
                <li><a href="index.html" class="currPage">Login</a></li>
                <li><a href="ataglance.html">At a Glance</a></li>
                <li><a href="setup.html">Setup</a></li>
                <li><a href="tutorial.html">Tutorial</a></li>
            </menu>
        </nav>
    </header>
  )
}

function Footer () {
  return (
    <footer>
      <hr />
      <p>Daniel Christiansen</p><a href="https://github.com/DanielMChristiansen/startup">GitHub</a>
    </footer>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);