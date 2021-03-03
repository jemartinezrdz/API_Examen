
import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

/*URL para consumir la API*/
const baseUrl="";
/*const cookies = new Cookies();*/

class Login extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, 
                                           password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                /*Variables de sesion llamadas igual que los atributos de la API
                cookies.set('id', respuesta.id, {path: "/"});
                */

                /*Redireccionamiento al Home*/
                window.location.href="./home";

            }else{
                alert('El usuario o la contraseña no son correctos');
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render(){
        return(
            <>
              <div className="body-login">
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
              </div>
            </>
        )
    }
}
export default Login;