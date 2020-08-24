import React, { useState, useEffect } from 'react';
import { verifyUser } from './services/auth';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.scss';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=> {
      handleVerify()
    }, [])
  
    const handleVerify = async () => {
      const userData = await verifyUser();
      setCurrentUser(userData);
    }

  return (
    <>
    <div className="App">
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Nav />
      <Main 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Footer />

    </div>
    </>
  );
}

export default App;