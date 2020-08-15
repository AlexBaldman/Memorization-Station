import React from 'react'
// import React, { useState, useEffect } from 'react'
// import { Route } from 'react-router-dom';
// import { getAllCharts } from '../services/charts';
// import { getAllObjects } from '../services/objects';
import Header from '../Header'
import Nav from '../Nav'
import Footer from '../Footer
// import Login from '../Login';
// import UserCreate from '../UserCreate';
// import ShowCharts from '../ChartsShow';
// import ShowObjects from './ObjectsShow';
// import CreateObject from './ObjectsCreate';
// import MemoryObject from './MemoryObject'
// import UpdateObject from './UpdateObject';

// double check all import names and relative locations //


export default function Main(props) {
  
  // const { setCurrentUser } = props;

  // const [charts, setCharts] = useState([]);
  // const [objects, setObjects] = useState([]);

  // useEffect(() => {
  //   getCharts();
  //   getObjects();
  // }, [])

  // const getCharts = async () => {
  //   const chartsList = await getAllCharts();
  //   setCharts(chartsList);
  // }

  // const getObjects = async () => {
  //   const objectsList = await getAllObjects();
  //   setObjects(objectsList);
  // }



    return (
      <main>
        <div className='main-content'>

        </div>
      </main>
      {/* <Route path='/login' render={(props) => (
        <Login
          {...props}
          setCurrentUser={setCurrentUser}
        />
      )} />
      <Route path='/createuser' render={(props) => (
        <Register
          {...props}
          setCurrentUser={setCurrentUser}
        />
      )} />
      <Route path='/charts' render={() => (
        <ShowCharts
          charts={charts}
        />
      )} />
      <Route exact path='/foods' render={() => (
        <ShowObjects
          objects={objects}
          setObjects={setObjects}
        />
      )} />
      <Route path='/objects/new' render={(props) => (
        <CreateObject
          {...props}
          setObjects={setObjects}
          objects={objects}
        />
      )} />
      <Route exact path='/objects/:id' render={(props) => (
        <MemoryObject
          {...props}
          flavors={flavors}
        />
      )} />
      <Route path='/objects/:id/edit' render={(props) => (
        <ObjectUpdate
          {...props}
          objects={objects}
          setObjects={setObjects}
        />
      )} /> */}
 
    )
}

