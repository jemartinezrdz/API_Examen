
import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';

/*cookies*/
const cookies = new Cookies();
const fetch = require('node-fetch');

class Login extends Component {
    state={
        data:[],
        modalError: false,
        form:{
            usuario: '',
            contrasena: ''
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
    
    iniciarSesion=()=>{
        
        fetch('http://201.132.203.2/login',{
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({"usuario": this.state.form.username, "contrasena": this.state.form.password}),
            cache: 'no-cache'
           })
           .then(function(response) {
            return response.json();
            
        })
        .then(function(data) {
            console.log('data = ', data);
            
            cookies.set('token',data.token, {path:"/"});
            console.log('Token generado:=> '+cookies.get('token'));
            localStorage.setItem('token',cookies.get('token'));
            window.location.href="./home";
        })
        .catch(function(err) {
            console.error(err);
            alert("Datos incorrectos o inexistentes");
        });
        
    }

    render(){
        return(
            <div>
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

            </div>
        )
    }
}
export default Login;