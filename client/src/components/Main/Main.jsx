import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import { getAllCharts } from '../../services/charts';
import { getAllObjects } from '../../services/objects';
import Home from '../Home/Home'
import Login from '../Login/Login';
import Register from '../Register/Register';
import Charts from '../Charts/Charts'
import Objects from '../Objects/Objects';
import ObjectCreate from '../ObjectCreate/ObjectCreate';
import ObjectUpdate from '../ObjectUpdate/ObjectUpdate';
import About from '../About/About'

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
      <main className="main">
        <Switch>
        
          <Route path='/' exact component={Home}  />

          <Route path='/login' render={(props) => (
            <Login
              {...props}
              setCurrentUser={setCurrentUser}
              />
          )}/>

          <Route path='/register' render={(props) => (
            <Register
              {...props}
              setCurrentUser={setCurrentUser}
              />
          )} />

          <Route path='/about' component={About} />
        
          <Route path='/charts' render={(props) => (
            <Charts
              {...props}
              objects={objects}
              setObjects={setObjects}
              />
          )} />

          <Route path='/objects' render={(props) => (
            <Objects
              {...props}
              objects={objects}
              setObjects={setObjects}
              />
          )} />
        

          <Route path='/objects/new' render={(props) => (
            <ObjectCreate
              {...props}
              objects={objects}
              setObjects={setObjects}
              />
          )} />

          <Route path='/objects/:id/edit' render={(props) => (
            <ObjectUpdate
              {...props}
              objects={objects}
              setObjects={setObjects}
              />
          )} /> 

        </Switch>

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






