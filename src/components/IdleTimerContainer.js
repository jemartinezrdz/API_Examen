import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import IdleTimer from 'react-idle-timer';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function IdleTimerContainer() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const idleTimerRef = useRef(null);
    const onIdle = () => {
        console.log('User is idle');
        setModalIsOpen(true);
    }

    const logOut = () => {
        cookies.remove('token', {path: "/"});
        localStorage.removeItem('token');
        setModalIsOpen(false);
        window.location.href="./";
    }

    return (
        <div>
            <Modal isOpen={modalIsOpen}>
                <ModalBody>
                  <span><h2 className="text-danger">La sesi&oacute;n expir&oacute;.</h2>
                  <p>Por motivos de seguridad, la sesi&oacute;n ha expirado. Por favor, ingrese de nuevo.</p>
                  </span>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={logOut}>Iniciar sesi&oacute;n</button>
                </ModalFooter>
            </Modal>

            <IdleTimer ref={idleTimerRef} timeout={2700 * 1000} onIdle={onIdle} ></IdleTimer>
        </div>
    )
}

export default IdleTimerContainer
