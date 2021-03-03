import React, { Component } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ModosVista from './ModosVista';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

const url="http://201.132.203.2/api/Recibo";

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
                <Navbar></Navbar>
                <div className="container-home">
                    <button className="btn btn-success btn-sm" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>
                        <i className="fas fa-plus"></i>
                    </button> 
                </div>
                
                <ModosVista/>
                                

                <Footer></Footer>

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
                    ¿Está seguro que deseas eliminar el recibo no. {form && form.id}?
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