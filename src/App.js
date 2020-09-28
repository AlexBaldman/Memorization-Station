import React, { useState, useEffect } from 'react';
import { verifyUser } from './services/auth';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.scss';

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=> {
      handleVerify()
    }, [])
  
  const handleVerify = async () => {
    const userData = await verifyUser()
    setCurrentUser(userData)
  }

  return (
    <>

      <div className="App">

        <Header
          {...props}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

        <Nav
          {...props}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

        <Main 
          {...props}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />

        <Footer
          {...props}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        
      </div>

    </>
  )
}

export default App;