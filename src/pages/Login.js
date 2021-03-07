
import React from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import DataAccess from '../components/DataAccess';

class Login extends DataAccess {
    
    render(){
        return(
            <>
                <div className="containerPrincipal bg-light">
                <h5 className="text-center title-login">Iniciar Sesi&oacute;n</h5>
                    <div className="containerSecundario">
                        <div className="form-group">
                            <label><strong>Usuario: </strong></label>
                            <br />
                            <input type="text" className="form-control" 
                                   name="username" onChange={this.handleChange}/>
                            <br /> 
                            <label><strong>Contrase&ntilde;a: </strong></label>
                            <br />
                            <input type="password" className="form-control" 
                                   name="password" onChange={this.handleChange}/>
                            <br />
                            <button className="btn btn-dark btn-sm" onClick={()=>this.iniciarSesion()}><strong>Entrar</strong></button>
                        </div>
                    </div>
                </div>

              <Modal isOpen={this.state.modalError}>
                <ModalHeader style={{display: 'block'}}>
                  <span>Error al iniciar sesi&oacute;n</span><span style={{float: 'right'}} onClick={()=>this.modalError()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <span>Los datos ingresados son incorrectos o inexistentes.</span>
                </ModalBody>
                <ModalFooter>
                            <button className="btn btn-dark" onClick={()=>this.modalError()}>Aceptar</button>
                        </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalVacios}>
                <ModalHeader style={{display: 'block'}}>
                  <span>Error al iniciar sesi&oacute;n</span><span style={{float: 'right'}} onClick={()=>this.modalVacios()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <span>Los campos no pueden estar vac&iacute;os.</span>
                </ModalBody>
                <ModalFooter>
                            <button className="btn btn-dark" onClick={()=>this.modalVacios()}>Aceptar</button>
                        </ModalFooter>
                </Modal>
            </>
        )
    }
}
export default Login;