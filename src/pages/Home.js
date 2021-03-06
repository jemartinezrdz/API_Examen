import React, { Component } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import ViewModo from '../views/ViewModo';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const fetch = require('node-fetch');

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
                </div>

                

               
                </>
            
        );
    }
}

export default Home;