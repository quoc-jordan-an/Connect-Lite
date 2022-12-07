import Navbar from './Navbar';
import React, { StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Admin from './Admin';
import User from './User';

const App = () => {
    return (
        // <div >
        //             <Navbar />
        //         </div>
        <StrictMode>
            <BrowserRouter>
                <div >
                    <Navbar />
                </div>
                <Routes>
                    {/* <Route exact path="/user"> 
                        <User/>
                    </Route> */}
                    {/* <Route exact path="/nav" element={<Navbar />}/> */}
                    <Route exact path="/" element={<Home />}/>
                    <Route path="/user" element={<User />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/admin" element={<Admin/>}/>
                </Routes>
            </BrowserRouter>
        </StrictMode>    
        );
}

export default App;