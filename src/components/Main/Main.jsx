import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import { getAllCharts } from '../../services/charts';
import { getAllObjects } from '../../services/objects';
import Login from '../Login/Login';
import UserCreate from '../UserCreate/UserCreate';
import ObjectCreate from '../ObjectCreate/ObjectCreate';
import ObjectUpdate from '../ObjectUpdate/ObjectUpdate';
import About from '../About/About'
// import ShowCharts from '../ChartsShow';
// import ShowObjects from './ObjectsShow';
// import MemoryObject from './MemoryObject'

// double check all import names and relative locations //


export default function Main(props) {
  
  const { setCurrentUser } = props;

  const [charts, setCharts] = useState([]);
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    getCharts();
    getObjects();
  }, [])

  const getCharts = async () => {
    const chartsList = await getAllCharts();
    setCharts(chartsList);
  }

  const getObjects = async () => {
    const objectsList = await getAllObjects();
    setObjects(objectsList);
  }


    return (
      <main>
        <Route path='/login' render={(props) => (
          <Login
            {...props}
            setCurrentUser={setCurrentUser}
            />
        )}/>

        <Route path='/about' render={() => (
          <About />
        )}/>

        <Route path='/createuser' render={(props) => (
          <UserCreate
            {...props}
            setCurrentUser={setCurrentUser}
            />
        )} />
      
   
        <Route path='/objects/new' render={(props) => (
          <ObjectCreate
            {...props}
            setObjects={setObjects}
            objects={objects}
            />
        )} />

        <Route path='/objects/:id/edit' render={(props) => (
          <ObjectUpdate
            {...props}
            objects={objects}
            setObjects={setObjects}
            />
        )} /> 

      {/* <Route exact path='/objects/:id' render={(props) => (
        <MemoryObject
          {...props}
          objects={objects}
          />
      )} /> */}

     {/* <Route exact path='/objects' render={() => (
          <Objects
            objects={objects}
            setObjects={setObjects}
            />
        )} /> */}

      </main>
    )
}






