import React, { useState } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VersionTabla from '../pages/VersionTabla';
import VersionRecibo from '../pages/VersionRecibo';

export default function ModosVista(){
    const [active, setActive] = useState("Tabla");

    return(
        <>
            <div className='container-home'>
                <div className='container-child-home'>
                    <div className="container">
                        <div className="row">
                            <div className="container-superior-izq">   
                                <h3>Administrador de recibos</h3>
                                <h6>Actualmente se muestran todos los registros.</h6>
                                
                            </div>
                            
                            <div className="container-superior-der">
                                <span>Cambiar vista</span>   
                                <a className="btn btn-link cuadricula" onClick={() => setActive("Recibo")}>
                                    <i className="fas fa-th-large"></i>
                                </a>
                                <a className="btn btn-link tabla" onClick={() => setActive("Tabla")}>
                                    <i className="fas fa-th-list"></i>
                                </a>
                            </div> 
                        </div>
                    </div>
                    <br/>
                    
                    {active === "Tabla" && <VersionTabla/>};
                    {active === "Recibo" && <VersionRecibo/>};

                </div>
            </div>
            
        </>
    )
}