import React, { useState } from 'react';
import '../css/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewTablas from '../views/ViewTablas';
import ViewRecibos from '../views/ViewRecibos';

export default function ViewModo(){
    const [active, setActive] = useState("Recibo");
    
    return(
        <>
            <div className='container-home'>
                    <div className='container-child-home'>
                        <div className="container">
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
                    
                </div>
                {active === "Tabla" && <ViewTablas/>};
                    {active === "Recibo" && <ViewRecibos/>};
            
        </>
    )
}