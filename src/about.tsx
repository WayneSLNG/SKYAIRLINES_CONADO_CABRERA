import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import beach from './images/beach2.jpg';
import river from './images/river.jpg';
import mountain from './images/mountain.jpg';
import sea from './images/sea.jpg';

import './about.css';

function About() {
    return (
        <div>
            <Navbar />
            <body>
                <div className="background-image">
                    <div className="overlay"></div>
                    <h1 className="mt-4 text-center title">SKY AIRLINES</h1>
                    <p className="text-center subtitle">Soaring Higher, Together.</p>
                </div>

                <div className='about-section m-2' style={{ fontFamily: "'Oswald', sans-serif" }}>
                    <div className='container' style={{ marginBottom: "90px"}}>
                            <h5 className="mb-4" style={{fontSize: '60px', color: '#002D62'}}>About Us</h5>
                            <p style={{fontWeight: '300', fontSize: '20px', color: '#000000'}}>Welcome aboard Sky Airlines, your gateway to unforgettable travel experiences in the sky! Established with a passion for aviation excellence, Sky Airlines takes pride in delivering exceptional service, safety, and comfort to our valued passengers. At Sky Airlines, we believe that every journey is an opportunity for adventure, connection, and discovery. Whether you're embarking on a business trip, a family vacation, or a solo adventure, we're here to make your travel dreams a reality. With a fleet of modern aircraft and a team of dedicated professionals, Sky Airlines is committed to providing seamless, hassle-free travel from takeoff to touchdown. Our mission is to exceed your expectations at every turn, offering unparalleled comfort, convenience, and reliability throughout your journey.</p>
                    </div>

                    <div className='container'>
                    <div className='row' style={{ marginBottom: "90px"}}>
                        <div className='col-md-6'>
                             <h5 className="mb-4" style={{fontSize: '60px', color: '#002D62'}}>Mission</h5>
                             <p style={{fontWeight: '300', fontSize: '20px', color: '#000000'}}>Sky Airlines is dedicated to providing safe, reliable, and comfortable air travel experiences. Our mission is to connect people, cultures, and opportunities through seamless journeys in the sky. With a commitment to excellence, innovation, and sustainability, we strive to exceed the expectations of our passengers while contributing positively to the communities we serve. Together, we soar to new heights, fostering a world where distance is no barrier to exploration, connection, and adventure.</p>
                            <Link to="/" className="btn btn-primary d-block mx-auto mb-4" style={{fontSize: '20px',width: '400px'}}>Book now</Link>
                        </div>
                        <div className='col-md-6'>
                            <img src={beach} alt="Sky Airlines" style={{ maxWidth: '100%', height: 'auto' }}/>
                        </div>
                    </div>
                    </div>
                    
                </div>

                <div className="mb-5 position-relative d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: `url(${river})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '300px' }}>
                        
                        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 0 }}></div>
                        <h1 className="mt-4 text-center text-light" style={{ fontSize: '100px', fontFamily: "'Oswald', sans-serif", zIndex: 1 }}>BOOK NOW</h1>

                        <div className="text-center mt-4" style={{ zIndex: 1 }}>
                            <Link to="/" className="btn btn-primary text-light p-3" style={{fontFamily: "'Oswald', sans-serif", fontSize: '15px', width: '150px', zIndex: 1 }}>Book now</Link>
                        </div>

                </div>

            </body>
            <Footer />
        </div>
    );
}

export default About;
