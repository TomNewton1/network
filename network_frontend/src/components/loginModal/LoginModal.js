import React, { useEffect } from 'react';
import reactDom from "react-dom"
import Login from '../accounts/Login';
import Register from '../accounts/Register';
import { useSelector } from 'react-redux'

import './LoginModal.css'
import { CgClose } from 'react-icons/all'

export default function LoginModal({ open, onClose, signInState, setsignInState}) {
    
    if (!open) return null

    if (signInState.signInType === "login") {
        
        return reactDom.createPortal(
            <>
                    <div className="overlay-style">
                        <div className="modal-style">
                            <div className="modal-container">
                                <CgClose className="exit-button" size={30} onClick={onClose}/>
                                <div className="modal-side-bar"></div>
                                <div className="modal-login">
                                    <Login/>
                                    <p>
                                        New to Reddit? <b className="modal-link" onClick={() => setsignInState({open: true, signInType: "register"})}>Sign Up</b>
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
            </>, 
            document.getElementById('portal')
        )
    }
    else if (signInState.signInType === "register") {
        return reactDom.createPortal(
            <>

                <div className="overlay-style">
                    <div className="modal-style">
                        <div className="modal-container">
                            <CgClose className="exit-button" size={30} onClick={onClose}/>
                            <div className="modal-side-bar"></div>
                            <div className="modal-login">
                                <Register/>
                                <p>
                                    Already have an account? <b className="modal-link" onClick={() => setsignInState({open: true, signInType: "login"})}>Log In</b>
                                </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </>, 
            document.getElementById('portal')
        )

    }
    
}
