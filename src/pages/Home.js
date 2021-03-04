import React, { Component } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from 'universal-cookie';
import Moment from 'moment';
import axios from 'axios';

const cookies = new Cookies();
const fetch = require('node-fetch');

class Home extends Component {
    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
          idRecibo: '',
          proveedor: '',
          monto: '',
          moneda: '',
          comentario: '',
          tipoModal: ''
        }
      }
      peticionGet=()=>{
        axios.get('http://201.132.203.2/ConsultarRecibos/').then(response=>{
          this.setState({data: response.data});
        }).catch(error=>{
          console.log(error.message);
        })
        }

        peticionPost=()=>{
            /*
                'http://201.132.203.2/RegistrarRecibo/',
                {
                    headers: { 
                        
                    },
                    data: { 
                        proveedor:this.state.form.proveedor,
                        monto:this.state.form.monto,
                        moneda:this.state.form.moneda,
                        comentario:this.state.form.comentario
                    }
                }
              ).then(response=>{
                this.modalInsertar();
                this.peticionGet();
              }).catch(error=>{
                console.log(error.message);
              });*/
              
              fetch('http://201.132.203.2/RegistrarRecibo/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+cookies.get('token')
                },
                body: JSON.stringify({"proveedor": this.state.form.proveedor, 
                                      "monto": parseInt(this.state.form.monto,10), 
                                      "moneda": this.state.form.moneda , 
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
            });
            this.modalInsertar();
            this.peticionGet();
          }
      
      peticionPut=()=>{
        fetch('http://201.132.203.2/ActualizarRecibo/',{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+cookies.get('token')
            },
            body: JSON.stringify({"idRecibo":this.state.form.idRecibo,
                                  "proveedor": this.state.form.proveedor, 
                                  "monto": this.state.form.monto, 
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
        });
        this.modalInsertar();
        this.peticionGet();
          /*
        axios.patch('http://201.132.203.2/ActualizarRecibo/', 
                    {
                        headers:
                        {
                            'Authorization': 'Bearer '+cookies.get('token')
                        },
                        data:
                        {
                            idRecibo:this.state.form.idRecibo,
                            proveedor:this.state.form.proveedor,
                            monto:parseInt(this.state.form.monto,10),
                            moneda:this.state.form.moneda,
                            comentario: this.state.form.comentario
                        }
                        
                    }
                   ).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        })*/
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
            this.peticionGet();
          });
      }
      
      modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
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
        console.log(this.state.form);
        }
        
        componentDidMount() {
                this.peticionGet();
            
        }
    /* Método para cerrar Sesión */
        cerrarSesion=()=>{
            /* 
            Eliminación de las variables de sesión*/
            cookies.remove('token', {path: "/"});
            window.location.href="./";
        }
    render() {
        const {form}=this.state;
        return (
            <>
                
                <Navbar></Navbar>
                <div className='container-home'>
                <div className='container-child-home'>
                    <div className="container">
                        <div className="row">
                            <div className="container-superior-izq">   
                                <h3>Administrador de recibos</h3>
                                <h6>Actualmente se muestran todos los registros.</h6>
                            </div>
                            <div className="container-superior-der">   
                                    <button className="btn btn-success btn-sm" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>
                                        <i className="fas fa-plus"></i>Nuevo registro
                                    </button> 
                                    <button className="btn btn-link " onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="container-home">
                    
                        <div className="container">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Proveedor</th>
                                <th>Monto</th>
                                <th>Moneda</th>
                                <th>Fecha</th>
                                <th>Comentario</th>
                                <th>Acci&oacute;n</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(Recibo=>{
                                    return(
                                    <tr>
                                        <th>{Recibo.idRecibo}</th>
                                        <td>{Recibo.proveedor}</td>
                                        <td>${new Intl.NumberFormat("en-EN").format(Recibo.monto)}</td>
                                        <td><span className="text-uppercase">{Recibo.moneda}</span></td>
                                        <td>{Moment(Recibo.fecha).format('DD-MM-YYYY')}</td>
                                        <td><small className="text-uppercase">{Recibo.comentario}</small></td>
                                        <td><button className="btn btn-secondary btn-sm cuadricula" onClick={()=>{this.seleccionarRecibo(Recibo); this.modalInsertar()}}>
                                                <i className="far fa-edit"></i>
                                            </button>
                                            {" "}
                                            <button className="btn btn-danger btn-sm tabla" onClick={()=>{this.seleccionarRecibo(Recibo); this.setState({modalEliminar: true})}}>
                                                <i className="far fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                    </div>

                </div>
            </div>

                <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="idRecibo">No. de recibo:</label>
                    <input className="form-control" type="text" name="idRecibo" id="idRecibo" readOnly onChange={this.handleChange} value={form?form.idRecibo: this.state.data.length+1} />
                    <br />
                    <label htmlFor="proveedor">Proveedor:</label>
                    <input className="form-control" type="text" name="proveedor" id="proveedor" onChange={this.handleChange} value={form?form.proveedor: ''}/>
                    <br />
                    <label htmlFor="monto">Monto:</label>
                    <input className="form-control" type="text" name="monto" id="monto" onChange={this.handleChange} value={form?form.monto: ''} />
                    <br />
                    <label htmlFor="moneda">Moneda:</label>
                    <input className="form-control" type="text" name="moneda" id="moneda"  onChange={this.handleChange} value={form?form.moneda: ''}/>
                    <br />
                    <label htmlFor="comentario">Comentario:</label>
                    <input className="form-control" type="text" name="comentario" id="comentario" onChange={this.handleChange} value={form?form.comentario: ''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                        {this.state.tipoModal=='insertar'?
                            <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                            Insertar
                        </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                            Actualizar
                        </button>
        }
                            <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                        </ModalFooter>
                </Modal>
            <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                    ¿Está seguro que deseas eliminar el recibo no. {form && form.idRecibo}?
                    </ModalBody>
                    <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                    <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                    </ModalFooter>
                </Modal>
                </>
            
        );
    }
}

export default Home;