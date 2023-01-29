import React from 'react'

import { Footer, Blog, Possibility, Features, WhatSum, Header } from './containers';
import { CTA, Brand, Navbar } from './components';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <div className="gradient__bg">
                <Navbar />
                <Header />
                <Features />
            
            {/*<Brand />
            <WhatSum />
            <Possibility />
            <CTA />
            <Blog />*/}
            <Footer />
            
        </div>
        </div>
    )
}

export default App