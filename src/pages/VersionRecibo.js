import React, { Component } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Moment from 'moment';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://201.132.203.2/api/Recibo";

class VersionRecibo extends Component {
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
      axios.get(url).then(response=>{
        this.setState({data: response.data});
      }).catch(error=>{
        console.log(error.message);
      })
      }
      
      peticionPost=async()=>{
        delete this.state.form.id;
       await axios.post(url,this.state.form).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
      }
      
      peticionPut=()=>{
        axios.put(url+this.state.form.id, this.state.form).then(response=>{
          this.modalInsertar();
          this.peticionGet();
        })
      }
      
      peticionDelete=()=>{
        axios.delete(url+this.state.form.id).then(response=>{
        this.setState({modalEliminar: false});
        this.peticionGet();
        })
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
        Eliminación de las variables de sesión
        cookies.remove('') 
        
        Redireccionamiento al Login*/
        window.location.href="./";
    }
    render() {
        const {form}=this.state;
        return (
            <>
                <div className="container">
                    {this.state.data.map(Recibo=>{
                        return(
                        <div className="card recibo">
                            <h6 className="card-header font-weight-bold">Recibo no. {Recibo.idRecibo}</h6>
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">Proveedor: <span className="font-weight-bold tabla">{Recibo.proveedor}</span></h6>
                                <p className="card-text"><small className="text-uppercase">Monto:</small> ${new Intl.NumberFormat("en-EN").format(Recibo.monto)}<span className="text-uppercase tabla">{Recibo.moneda}</span></p>
                                <p className="card-text"><small className="text-uppercase">Comentario: {Recibo.comentario}</small></p>
                                <p className="card-text"><small className="text-uppercase">Registro:</small> {Moment(Recibo.fecha).format('DD-MM-YYYY')}</p>
                                <button className="btn btn-secondary btn-sm" onClick={()=>{this.seleccionarRecibo(Recibo); this.modalInsertar()}}>
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

export default VersionRecibo;