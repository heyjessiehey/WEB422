/************************************************************************************************ 
 * WEB422 – _Assignment 4 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source 
 * (including web sites) or distributed to other students. 
 * 
 * Name: Jessie Gayeon Ko    Student ID: 040704124       Date: Mar 8, 2019 
 * 
 * 
 ***********************************************************************************************/

import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Overview from './Overview';
import Projects from './Projects';
import Teams from './Teams';
import Employees from './Employees';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={()=>(<Overview />)}></Route>
        <Route exact path='/projects' render={()=>(<Projects />)}></Route>
        <Route exact path='/teams' render={()=>(<Teams />)}></Route>
        <Route exact path='/employees' render={()=>(<Employees />)}></Route>
        <Route render={()=>(<NotFound />)}></Route>
      </Switch>
    );
  }
}

export default App;