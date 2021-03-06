import React, { Component } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Moment from 'moment';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const fetch = require('node-fetch');

class ViewRecibos extends Component {
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
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

cerrarSesion=()=>{
  cookies.remove('token');
    localStorage.removeItem('token');
    window.location.href="./";
}
  /*VALIDAR ACCION*/
  validarPut=()=>{
    if(this.state.form !== "" || this.state.provError === "" || this.state.montoError === "" || this.state.monError === "" || this.state.comError === ""){
          this.peticionPostt();
    }else{
      this.modalVacios();
    }
  }
  validarPost=()=>{
    if(this.state.form !== "" || this.state.provError === "" || this.state.montoError === "" || this.state.monError === "" || this.state.comError === ""){
          this.peticionPut();
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
    componentDidMount(){
        this.cargarDatos();
    }

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
    
    render() {
        const {form}=this.state;
        return (
            <>
                <div className="container-child-home">
                <h3>Administrador de recibos</h3>
                <button className="btn btn-success btn-sm" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>
                        <i className="fas fa-plus"></i>Nuevo registro
                </button> 
                <button className="btn btn-link " onClick={()=>this.cerrarSesion()}>Cerrar Sesi&oacute;n</button>


                    {this.state.data.map(Recibo=>{
                        return(
                        <div className="card recibo">
                            <h6 className="card-header font-weight-bold">Recibo no. {Recibo.idRecibo}</h6>
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">Proveedor: <span className="font-weight-bold tabla">{Recibo.proveedor}</span></h6>
                                <p className="card-text"><small className="text-uppercase">Monto:</small> ${new Intl.NumberFormat("en-EN").format(Recibo.monto)}<span className="text-uppercase tabla">{Recibo.moneda}</span></p>
                                <p className="card-text"><small className="text-uppercase">Comentario: {Recibo.comentario}</small></p>
                                <p className="card-text"><small className="text-uppercase">Registro:</small> {Moment(Recibo.fecha).format('DD-MM-YYYY')}</p>
                                <button className="btn btn-secondary btn-sm" onClick={()=>{this.seleccionarRecibo(Recibo); this.modalEditar()}}>
                                    <i className="far fa-edit"></i>
                                </button>
                                {" "}
                                <button className="btn btn-danger btn-sm" onClick={()=>{this.seleccionarRecibo(Recibo); this.setState({modalEliminar: true})}}>
                                    <i className="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                        )
                    }
                    )}
                </div>

                <Modal isOpen={this.state.modalInsertar}>
                  <ModalHeader style={{display: 'block'}}>
                      <div className="font-weight-bold">
                          Registrar nuevo recibo 
                          <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>
                          <button className="btn btn-link">
                              <i className="fa fa-times-circle"></i>
                          </button>
                          </span>
                      </div> 
                  </ModalHeader>
                  <ModalBody>
                    
                      <div className="form-group">
                        
                        <label htmlFor="proveedor">Proveedor:</label>
                        <input className="form-control" type="text" name="proveedor" id="proveedor" onChange={this.handleProvChange} value={this.state.proveedor}/>
                        <small className="text-danger">{this.state.provError}</small>
                        <br />
                        <div className="row">
                          <div className="col-8">
                            <label htmlFor="monto">Monto:</label>
                            <input className="form-control" type="text" name="monto" id="monto" onChange={this.handleMontoChange} value={this.state.monto} />
                            <small className="text-danger">{this.state.montoError}</small>
                          </div>
                          <div className="col-4">
                            <label htmlFor="moneda">Moneda:</label>
                            <input className="form-control" type="text" name="moneda" id="moneda"  onChange={this.handleMonedaChange} value={this.state.moneda}/>
                            <small className="text-danger">{this.state.monError}</small>
                          </div>
                        </div>
                        <br />
                        
                        <label htmlFor="comentario">Comentario:</label>
                        <input className="form-control" type="text" name="comentario" id="comentario" onChange={this.handleCommentChange} value={this.state.comentario}/>
                        <small className="text-danger">{this.state.comError}</small>
                      </div>
                      
                </ModalBody>
                <ModalFooter>
                <button className="btn btn-success font-weight-bold" onClick={()=>this.peticionPost()} >
                          Agregar
                      </button>&nbsp;
                      <button className="btn btn-danger font-weight-bold" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader style={{display: 'block'}}>
                    <div className="font-weight-bold">
                        Modificar recibo #{form && form.idRecibo} 
                        <span style={{float: 'right'}} onClick={()=>this.modalEditar()}>
                        <button className="btn btn-link">
                            <i className="fa fa-times-circle"></i>
                        </button>
                        </span>
                    </div> 
                    </ModalHeader>
                    <ModalBody>
                      <div className="form-group">
                        <label htmlFor="proveedor">Proveedor:</label>
                        <input className="form-control text-uppercase ${this.state.provError ? 'is-invalid' : ''}" type="text" name="proveedor" id="proveedor" onChange={this.handleChange} value={form?form.proveedor: ''}/>
                        <small className="text-danger">{this.state.provError}</small>
                        <br />
                        <div className="row">
                          <div className="col-8">
                            <label htmlFor="monto">Monto:</label>
                            <input className="form-control ${this.state.montoError ? 'is-invalid' : ''}" type="text" name="monto" id="monto" onChange={this.handleChange} value={form?form.monto: ''} />
                            <small className="text-danger">{this.state.montoError}</small>
                          </div>
                          <div className="col-4">
                            <label htmlFor="moneda">Moneda:</label>
                            <input className="form-control text-uppercase ${this.state.monError ? 'is-invalid' : ''}" type="text" name="moneda" id="moneda"  onChange={this.handleChange} value={form?form.moneda: ''}/>
                            <small className="text-danger">{this.state.monError}</small>
                          </div>
                        </div>
                        <br />
                        
                        <label htmlFor="comentario">Comentario:</label>
                        <input className="form-control text-uppercase ${this.state.comError ? 'is-invalid' : ''}" type="text" name="comentario" id="comentario" onChange={this.handleChange} value={form?form.comentario: ''}/>
                        <small className="text-danger">{this.state.comError}</small>
                      </div>
                </ModalBody>
                <ModalFooter>
                <button className="btn btn-success font-weight-bold" onClick={()=>this.peticionPut()} >
                          Guardar cambios
                      </button>&nbsp;
                      <button className="btn btn-danger font-weight-bold" onClick={()=>this.modalInsertar()}>Cancelar</button>
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
            <Modal isOpen={this.state.modalVacios}>
                <ModalHeader style={{display: 'block'}}>
                  <span>Error al iniciar sesi&oacute;n</span><span style={{float: 'right'}} onClick={()=>this.modalVacios()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <span>Los campos están vac&iacute;s o tienen datos incorrectos.</span>
                </ModalBody>
                <ModalFooter>
                            <button className="btn btn-dark" onClick={()=>this.modalVacios()}>Aceptar</button>
                        </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default ViewRecibos;