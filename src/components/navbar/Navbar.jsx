import React, { useState } from 'react';
import './navbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.svg';

const Menu = () => (
    <>
    <p><a href="#home">Home</a></p>
    <p><a href="#wsum">What is Summify?</a></p>
    <p><a href="#possibility">Open AI</a></p>
    <p><a href="#features">Case Studies</a></p>
    <p><a href="#blog">Library</a></p>
    </>
)

const Navbar = () => {

    const [toggleMenu, setToggle] = useState(false);
    return (

        //BEM css naming convention
        <div className="sum__navbar">
            <div className="sum__navbar-links">
                <div className="sum__navbar-links_logo">
                    <h1>Summify</h1>
                </div>
                <div className="sum__navbar-links_container">
                    <Menu />
                </div>
            </div>
            <div className="sum__navbar-sign">
                <p>Sign in</p>
                <button type="button">Sign up</button>
            </div>
            <div className="sum_navbar-menu">
                {toggleMenu 
                ? <RiCloseLine color="#fff" size={27} onClick={()=> setToggle(false)} />
                : <RiMenu3Line color="#fff" size={27} onClick={()=> setToggle(true)} />
                }
                {toggleMenu && (
                    <div className="sum__navbar-menu_container scale-up-center"> 
                        <div className="sum__navbar-menu_container-links">
                            <Menu />
                            <div className="sum__navbar-menu_container-links-sign">
                                <p>Sign in</p>
                                <button type="button">Sign up</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
