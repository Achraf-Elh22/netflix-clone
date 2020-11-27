import React , {useState,useEffect} from 'react';

import logo from "./Netflix_Logo.png"
import avatar from "./Netflix_Avatar.png"


import "./Nav.css";

const Nav = () => {
    const [show,handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100) {
                handleShow(true);
            } else{handleShow(false)};
            return ()=>{
                window.removeEventListener("scroll");
            }
        })

    },[])
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img src={logo} alt="logo" className="nav__logo"/>
            <img src={avatar} alt="profile" className="nav__avatar"/>
        </div>
    );
}

export default Nav;
