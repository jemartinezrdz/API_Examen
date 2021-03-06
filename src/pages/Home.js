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
  state={
    data:[],
    ultimo:[],
    modalInsertar: false,
    modalVacios: false,
    form:{
      idRecibo: '',
      proveedor: '',
      monto: '',
      moneda: '',
      comentario: '',
      tipoModal: ''
    },
    proveedor:'',
    monto: '',
    moneda: '',
    comentario: '',
    provError: '',
    montoError: '',
    monError: '',
    comError: ''
  }
  /*VALIDAR ACCION*/
  validarPost=()=>{
    if(this.state.form !== "" || this.state.provError === "" || this.state.montoError === "" || this.state.monError === "" || this.state.comError === ""){
          this.peticionPost();
    }else{
      this.modalVacios();
    }
  }
  /*modal para error de campos vacios*/
  modalVacios=()=>{
    this.setState({modalVacios: !this.state.modalVacios});
  }
  /* VALIDACIONES */
  handleProvChange = (event) => {
    this.setState({proveedor: event.target.value }, () => {
      this.validateProv();
    });
  }

  validateProv = () => {
    const { proveedor } = this.state;
    let regex = new RegExp("^[a-zA-Z0-9 ]+$");

    this.setState({
      provError:
        regex.test(proveedor)=== true ? null : 'Sólo se admiten letras, números y espacios'
    });
  }

  handleMontoChange = (event) => {
    this.setState({ monto: event.target.value }, () => {
      this.validateMonto();
    });
  }

  validateMonto = () => {
    const { monto } = this.state;
    let regex = new RegExp("^[0-9]+$");

        this.setState({
          montoError:
            regex.test(monto) === true ? null : 'Sólo se admiten números enteros.'
        });
  }

  handleMonedaChange = (event) => {
    this.setState({ moneda: event.target.value }, () => {
      this.validateMoneda();
    });
  };

  validateMoneda = () => {
    const { moneda } = this.state;
    let regex = new RegExp("^[a-zA-Z]+$");

    this.setState({
      monError:
        regex.test(moneda) === true ? null : 'Sólo se admiten letras.'
    });
  }

  handleMonedaChange = (event) => {
    this.setState({ moneda: event.target.value }, () => {
      this.validateMoneda();
    });
  };

  validateMoneda = () => {
    const { moneda } = this.state;
    let regex = new RegExp("^[a-zA-Z]+$");

    this.setState({
      monError:
        regex.test(moneda) === true ? null : 'Sólo se admiten letras.'
    });
  }

  handleCommentChange = (event) => {
    this.setState({ comentario: event.target.value }, () => {
      this.validateComment();
    });
  }

  validateComment = () => {
    const { comentario } = this.state;
    let regex = new RegExp("^[a-zA-Z0-9., ]+$");

    this.setState({
      comError:
        regex.test(comentario)=== true ? null : 'Sólo se admiten letras, números, espacios y signos de puntuación.'
    });
  }

  /*FIN VALIDACIONES*/

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    }

peticionGet=()=>{
    axios.get('http://201.132.203.2/ConsultarRecibos/').then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
    }
    
    

peticionPost=()=>{
      fetch('http://201.132.203.2/RegistrarRecibo/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+cookies.get('token')
        },
        body: JSON.stringify({"proveedor": this.state.proveedor, 
                              "monto": parseInt(this.state.monto,10), 
                              "moneda": this.state.moneda , 
                              "comentario": this.state.comentario}),
        cache: 'no-cache'
    })
    .then(function(response) {
        return response.json();
        
    })
    .then(function(data) {
        console.log('data = ', data);
    })
    .catch(function(err) {
        console.error(err);
    });
    this.modalInsertar();
    this.cargarDatos();
}

modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

cerrarSesion=()=>{
  cookies.remove('token');
    localStorage.removeItem('token');
    window.location.href="./";
}

componentDidMount(){
  this.peticionGet();
}

render() {
    const {form}=this.state;
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