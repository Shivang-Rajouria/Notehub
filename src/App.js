import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

import austinBackground from './components/cup.avif'; // Import the background image

function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert} />
        <div style={{ 
          background: `url(${austinBackground}) center center / cover no-repeat`,
          minHeight: '100vh',
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home showalert={showalert} />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login showalert={showalert} />} />
            <Route path="/Signup" element={<Signup showalert={showalert} />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
