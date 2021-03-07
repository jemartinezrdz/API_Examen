import React, { Component } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import ViewModo from '../views/ViewModo';
import IdleTimerContainer from '../components/IdleTimerContainer';

class Home extends Component {
  
render() {
        return (
            <>
                <Navbar></Navbar>
                <div className='container-home'>
                  <div className='container'>
                      <ViewModo/>
                   </div>
                   <br />
                <IdleTimerContainer></IdleTimerContainer>
                </div>
                
            </>
        );
    }
}

export default Home;