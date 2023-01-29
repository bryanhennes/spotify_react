import React, { useEffect, useState } from 'react';
import './header.css';
import axios from 'axios';
import { RiContactsBookLine } from 'react-icons/ri';





const Header = () => {

    return (
        <div className="sum__header section_padding" id="home">
            <div className="sum__header-content">
                <h1 className="gradient__text">Summify</h1>
            </div>
        </div>
    )
}

export default Header
