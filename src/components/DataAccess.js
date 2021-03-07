
import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';

/*cookies*/
const cookies = new Cookies();
const fetch = require('node-fetch');

class DataAccess extends Component {
    state={
        data:[],
        modalError: false,
        modalVacios: false,
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
        /*console.log(this.state.form);*/
    }
    
    datosCorrectos=()=>{
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
            })
            .catch(function(err) {
                console.error(err);
                
            });
     };
        
    iniciarSesion=()=>{
        if( (!this.state.form.username) && (!this.state.form.password) || 
            (!this.state.form.username) || (!this.state.form.password) ){
            this.modalVacios();

        }else{
            this.datosCorrectos();
            if(!localStorage.getItem('token')){
                this.modalError();
            }else{
                window.location.href="./home";
            }
        }
    }

    modalError=()=>{
        this.setState({modalError: !this.state.modalError});
    }
    modalVacios=()=>{
        this.setState({modalVacios: !this.state.modalVacios});
    }

    render(){
        return(
            <div>
              Acceso Login
            </div>
        )
    }
}
export default DataAccess;