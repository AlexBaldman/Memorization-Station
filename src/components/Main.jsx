import React from 'react';
// import React, { useState, useEffect } from 'react'
// import { Route } from 'react-router-dom';
// import { getAllCharts } from '../services/charts';
// import { getAllObjects } from '../services/objects';
// import Login from './Login';
// import CreateUser from './CreateUser';
// import ShowCharts from './ShowCharts';
// import ShowObjects from './ShowObjects';
// import CreateObject from './CreateObject';
// import MemoryObject from './MemoryObject'
// import UpdateObject from './UpdateObject';

// need to be sure to name components correctly and 
// make sure imports are matching in other components



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
      <div>
        <h1>It's Alive!</h1>
      </div>
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
        <UpdateObject
          {...props}
          objects={objects}
          setObjects={setObjects}
        />
      )} /> */}
    </main>
  )
}
