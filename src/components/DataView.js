import React, { Component } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const fetch = require('node-fetch');

class DataView extends Component {

  state={
    data:[],
    ultimo:[],
    modalInsertar: false,
    modalEliminar: false,
    modalEditar: false,
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
  let regex = new RegExp("^[0-9.]+$");

      this.setState({
        montoError:
          regex.test(monto) === true ? null : 'Sólo se admiten números enteros o decimales.'
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


cargarDatos=()=>{
    axios.get('http://201.132.203.2/ConsultarRecibos/').then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
}
obtenerUltimoId=()=>{
    axios.get('http://201.132.203.2/UltimoRecibo/').then(response=>{
      this.setState({ultimo: response.data});
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
                              "monto": parseFloat(this.state.monto), 
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

peticionPut=()=>{
  /*
  axios.patch('http://201.132.203.2/ActualizarRecibo/',
  {
    headers:{
        'Authorization': 'Bearer '+cookies.get('token')
    },
    data: {
    idRecibo: this.state.form.idRecibo,
    proveedor: this.state.form.proveedor,
    monto: parseFloat(this.state.form.monto),
    moneda: this.state.form.moneda,
    comentario: this.state.form.comentario
    }
    }).then(response=>{
    this.setState({modalEliminar: false});
    this.cargarDatos();
    });*/
    /*
    fetch('http://201.132.203.2/ActualizarRecibo/',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+cookies.get('token')
        },
        body: JSON.stringify({"idRecibo":this.state.form.idRecibo,
                              "proveedor": this.state.form.proveedor, 
                              "monto": parseFloat(this.state.monto), 
                              "moneda": this.state.form.moneda, 
                              "comentario": this.state.form.comentario}),
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
    });*/
    
    axios({
      method: 'patch', //you can set what request you want to be
      url: 'http://201.132.203.2/ActualizarRecibo/',
      data: {
        idRecibo: this.state.form.idRecibo,
        proveedor: this.state.form.proveedor,
        monto: parseFloat(this.state.form.monto),
        moneda: this.state.form.moneda,
        comentario: this.state.form.comentario
        },
      headers: {
        Authorization: 'Bearer ' +cookies.get('token')
      }
    })
    this.modalEditar();
    this.cargarDatos();
    
     
    }
    

peticionDelete=()=>{
    axios.delete(
        'http://201.132.203.2/BorrarRecibo/',
        {
            headers:{
                'Authorization': 'Bearer '+cookies.get('token')
            },
            data: {
            idRecibo: this.state.form.idRecibo
            }
      }).then(response=>{
        this.setState({modalEliminar: false});
        this.cargarDatos();
      });
  }

modalEditar=()=>{
    this.setState({modalEditar: !this.state.modalEditar});
  }
  
seleccionarRecibo=(Recibo)=>{
this.setState({
    tipoModal: 'actualizar',
    form: {
    idRecibo: Recibo.idRecibo,
    proveedor: Recibo.proveedor,
    monto: Recibo.monto,
    moneda: Recibo.moneda,
    comentario: Recibo.comentario
    }
})
}

handleChange=async e=>{
e.persist();
await this.setState({
    form:{
    ...this.state.form,
    [e.target.name]: e.target.value
    }
});
/*console.log(this.state.form);*/
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

cerrarSesion=()=>{
cookies.remove('token', {path: "/"});
  localStorage.removeItem('token');
  window.location.href="./";
}
 /*VALIDAR ACCION*/
 validarPut=()=>{

   if((this.state.proveedor === null) || (this.state.monto === null) || (this.state.moneda === null)||
   (this.state.comentario === null) || (this.state.provError) || (this.state.montoError) || 
   (this.state.monError) || (this.state.comError)){
    
    this.modalVacios();
        
  }else{
    this.peticionPut();
    this.cargarDatos();
  }
}
validarPost=()=>{
  if((this.state.proveedor === null) || (this.state.monto === null) || (this.state.moneda === null)||
  (this.state.comentario === null) || (this.state.provError) || (this.state.montoError) || 
  (this.state.monError) || (this.state.comError)){
        this.modalVacios();
  }else{
    this.peticionPost();
    this.cargarDatos();
  }
}
cancelarPost=()=>{
  this.setState({
    proveedor: null,
    monto: null,
    moneda: null,
    comentario: null,
    provError: null,
    montoError: null,
    monError: null,
    comError: null,
    form:{
      proveedor: null,
      monto: null,
      moneda: null,
      comentario: null
    }
  })
  this.modalInsertar();
}
cancelarPut=()=>{
  this.setState({
    proveedor: null,
    monto: null,
    moneda: null,
    comentario: null,
    provError: null,
    montoError: null,
    monError: null,
    comError: null,
    form:{
      proveedor: null,
      monto: null,
      moneda: null,
      comentario: null
    }
  })
  this.modalEditar();
}
/*modal para error de campos vacios*/
modalVacios=()=>{
  this.setState({modalVacios: !this.state.modalVacios});
}

sessionTimeOut=()=>{
  setInterval(this.cerrarSesion(),(10000));
}

    render() {
        return (
            <div>
                <p>Componente padre</p>
            </div>
        );
    }
}

export default DataView;
