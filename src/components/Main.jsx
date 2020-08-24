import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import { getAllCharts } from '../services/charts';
import { getAllObjects } from '../services/objects';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Chart from './Chart';
import Charts from './Charts';
import ChartEdit from './ChartEdit'
import ChartCreate from './ChartCreate';
import Objects from './Objects';
import ObjectCreate from './ObjectCreate';
import ObjectUpdate from './ObjectUpdate';
import About from './About';

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

          <Route path='/charts/:id' render={(props) => (
            <Chart
              {...props}
              objects={objects}
              setObjects={setObjects}
              charts={charts}
              setCharts={setCharts}
              />
            )} /> 

          <Route path='/charts' exact render={(props) => (
            <Charts
              {...props}
              charts={charts}
              setCharts={setCharts}
              />
            )} /> 

          <Route path='/charts/new' exact render={(props) => (
            <ChartCreate
              {...props}
              charts={charts}
              setCharts={setCharts}
              />
            )} /> 

          <Route path='/charts/:id/edit' render={(props) => (
            <ChartEdit
              {...props}
              objects={objects}
              setObjects={setObjects}
              charts={charts}
              setCharts={setCharts}
              />
            )} /> 
            
          <Route path='/memory_objects' exact render={(props) => (
            <Objects
              {...props}
              charts={charts}
              setCharts={setCharts}
              objects={objects}
              setObjects={setObjects}
              />
            )} />

          <Route path='/memory_objects/:id/new' render={(props) => (
            <ObjectCreate
              {...props}
              charts={charts}
              setCharts={setCharts}
              objects={objects}
              setObjects={setObjects}
              />
           )} />

          <Route path='/memory_objects/:id/edit' render={(props) => (
            <ObjectUpdate
              {...props}
              charts={charts}
              setCharts={setCharts}
              objects={objects}
              setObjects={setObjects}
              />
          )} />

        </Switch>
      </main>
    )
}






