import React, { Component } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


class Eliminar extends Component {
    /* Método para cerrar Sesión */
    cerrarSesion=()=>{
        /* 
        Eliminación de las variables de sesión
        cookies.remove('') 
        
        Redireccionamiento al Login*/
        window.location.href="./";
    }
    render() {
        return (
            <>
                <Navbar></Navbar>
                <div className='container-home'>
                    <div className='container-child-home'>
                        <h3>Eliminar recibo</h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis faucibus pretium ipsum vitae scelerisque. 
                        Fusce aliquet diam eu est malesuada semper. Etiam id laoreet lectus. Suspendisse eu neque vitae nisi ullamcorper congue. 
                        Integer nec iaculis justo, sit amet tincidunt massa. Donec convallis arcu ut ligula eleifend sodales. Ut quis interdum ipsum. 
                        Cras libero sem, ornare in vulputate ac, rhoncus vitae elit. Curabitur sed condimentum turpis, nec facilisis quam. 
                        Nunc facilisis nunc tortor, sit amet ornare elit luctus eu. 
                        Mauris luctus neque feugiat porta consequat. Nam ut efficitur dolor. 
                        Donec aliquam arcu a augue ullamcorper accumsan. Aenean a nunc massa.
                    </div>
                </div>
                <Footer></Footer>
            </>
        );
    }
}

export default Eliminar;