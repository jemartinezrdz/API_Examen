import React from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'moment';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import DataView from '../components/DataView';


class ViewRecibos extends DataView {
    
    componentDidMount(){
      this.cargarDatos();
      this.obtenerUltimoId();
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
                      <label htmlFor="idRecibo">No. nuevo recibo:</label>   
                      {this.state.ultimo.map(Recibo=>{
                                return(
                                  <input className="form-control col-4" type="text" name="idRecibo" id="idRecibo" onChange={this.handleChange} readOnly value={Recibo.idRecibo} />   
                                )
                            }
                            )}
                      <br/>
                      <label htmlFor="proveedor">Proveedor:</label>
                        <input className={`form-control ${this.state.provError ? 'is-invalid' : ''}`} type="text" name="proveedor" id="proveedor" onChange={this.handleChange} onBlur={this.handleProvChange}  value={form?form.proveedor:''}/>
                        <small className="text-danger">{this.state.provError}</small>
                        <br />
                        <div className="row">
                          <div className="col-8">
                            <label htmlFor="monto">Monto:</label>
                            <input className={`form-control ${this.state.montoError ? 'is-invalid' : ''}`} type="text" name="monto" id="monto" onChange={this.handleChange} onBlur={this.handleMontoChange}  value={form?form.monto:''} />
                            <small className="text-danger">{this.state.montoError}</small>
                          </div>
                          <div className="col-4">
                            <label htmlFor="moneda">Moneda:</label>
                            <input className={`form-control ${this.state.monError ? 'is-invalid' : ''}`} type="text" name="moneda" id="moneda"  onChange={this.handleChange} onBlur={this.handleMonedaChange} value={form?form.moneda:''}/>
                            <small className="text-danger">{this.state.monError}</small>
                          </div>
                        </div>
                        <br />
                        
                        <label htmlFor="comentario">Comentario:</label>
                        <input className={`form-control ${this.state.comError ? 'is-invalid' : ''}`} type="text" name="comentario" id="comentario" onChange={this.handleChange} onBlur={this.handleCommentChange}  value={form?form.comentario:''}/>
                        <small className="text-danger">{this.state.comError}</small>
                      </div>
                      
                </ModalBody>
                <ModalFooter>
                <button className="btn btn-success font-weight-bold" onClick={()=>this.validarPost()} >
                          Agregar
                      </button>&nbsp;
                      <button className="btn btn-danger font-weight-bold" onClick={()=>this.cancelarPost()}>Cancelar</button>
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
                        <input className={`form-control ${this.state.provError ? 'is-invalid' : ''}`} type="text" name="proveedor" id="proveedor" onChange={this.handleChange} onBlur={this.handleProvChange}  value={form?form.proveedor:''}/>
                        <small className="text-danger">{this.state.provError}</small>
                        <br />
                        <div className="row">
                          <div className="col-8">
                            <label htmlFor="monto">Monto:</label>
                            <input className={`form-control ${this.state.montoError ? 'is-invalid' : ''}`} type="text" name="monto" id="monto" onChange={this.handleChange} onBlur={this.handleMontoChange}  value={form?form.monto:''} />
                            <small className="text-danger">{this.state.montoError}</small>
                          </div>
                          <div className="col-4">
                            <label htmlFor="moneda">Moneda:</label>
                            <input className={`form-control ${this.state.monError ? 'is-invalid' : ''}`} type="text" name="moneda" id="moneda"  onChange={this.handleChange} onBlur={this.handleMonedaChange} value={form?form.moneda:''}/>
                            <small className="text-danger">{this.state.monError}</small>
                          </div>
                        </div>
                        <br />
                        
                        <label htmlFor="comentario">Comentario:</label>
                        <input className={`form-control ${this.state.comError ? 'is-invalid' : ''}`} type="text" name="comentario" id="comentario" onChange={this.handleChange} onBlur={this.handleCommentChange}  value={form?form.comentario:''}/>
                        <small className="text-danger">{this.state.comError}</small>
                      </div>
                </ModalBody>
                <ModalFooter>
                <button className="btn btn-success font-weight-bold" onClick={()=>this.validarPut()} >
                          Guardar cambios
                      </button>&nbsp;
                      <button className="btn btn-danger font-weight-bold" onClick={()=>this.cancelarPut()}>Cancelar</button>
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
                  <span>Error</span><span style={{float: 'right'}} onClick={()=>this.modalVacios()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <span>Los campos están vac&iacute;os o tienen datos incorrectos.</span>
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
