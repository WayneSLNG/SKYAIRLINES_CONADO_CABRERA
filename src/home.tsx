import React from 'react';
import Navbar from './navbar';
import Search from './search';
import Footer from './footer';
import beach from './images/beach2.jpg';
import river from './images/river.jpg';
import mountain from './images/mountain.jpg';
import sea from './images/sea.jpg';
import logo from './images/SAlogo.png';

import './home.css';

function Home() {
    return (
        <div>
            <div className="home-container" style={{ fontFamily: "'Oswald', sans-serif" }}>
                <Navbar />
                <Search />
            </div>

            <div style={{ marginTop: '80px', background: '#eee',fontFamily: "'Oswald', sans-serif" }}>
                <div className='container'>
                    <div className='row'>

                    <div className='col-md-4' style={{ padding: '90px'}}>
                        <h5 className="mb-3" style={{fontSize: '60px', color: '#002D62'}}>FLY to More Fun!</h5>
                        <p style={{fontWeight: '300', fontSize: '20px', color: '#002D62'}}>We are proud to have the most extensive route network in the Philippines, with routes to 36 domestic destinations, including Manila, Cebu, and Clark,</p>
                    </div>

                    <div className='col-md-6'>
                        <img src={logo} alt="Sky Airlines" className="logo-img" style={{ width: '700px', height: 'auto' }} />
                    </div>

                    </div>                    
                </div>
            </div>

            <div className='container' style={{ marginTop: '50px',fontFamily: "'Oswald', sans-serif" }}>
                <div className='row mb-5'>
                <label htmlFor="" style={{ fontSize: '30px'}}>Travel Guide</label>
                <h5 className="" style={{fontSize: '60px', color: '#002D62'}}>Explore with Confidence</h5>

                    <div className='col'>
                        <div className='card position-relative hover-card' style={{ backgroundImage: `url(${beach})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px'}}>
                            <div className='card-body'>
                                <h4>Safety and well-being</h4>
                            </div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='card position-relative hover-card' style={{ backgroundImage: `url(${river})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px'}}>
                            <div className='card-body'>
                                <h4>Travel requirements</h4>
                            </div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='card position-relative hover-card' style={{ backgroundImage: `url(${mountain})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px'}}>
                            <div className='card-body'>
                                <h4>Flexible travel option</h4>
                            </div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='card position-relative hover-card' style={{ backgroundImage: `url(${sea})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px'}}>
                            <div className='card-body'>
                                <h4>Sky Airlines Flights Timetable</h4>
                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home;
