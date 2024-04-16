import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer text-light" style={{ backgroundColor: '#6CB4EE', fontFamily: "'Oswald', sans-serif" }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5">
                        <h5>CONTACT US</h5>
                        <p className='fs-5' style={{ color: '#002D62' }}><i className="bi bi-envelope" style={{ color: '#002D62' }}></i> skyairlines@gmail.com</p>
                        <p className='fs-5' style={{ color: '#002D62' }}><i className="bi bi-telephone" style={{ color: '#002D62' }}></i> 0956 855 3589</p>
                    </div>
                    <div className="col-md-6 mt-5">
                        <h5>CONNECT WITH US</h5>
                        <ul className="list-inline">
                            <li className="list-inline-item fs-2 me-4"><a href="/"><i className="bi bi-facebook" style={{ color: '#002D62' }}></i></a></li>
                            <li className="list-inline-item fs-2 me-4"><a href="/"><i className="bi bi-instagram" style={{ color: '#002D62' }}></i></a></li>
                            <li className="list-inline-item fs-2 me-4"><a href="/"><i className="bi bi-youtube" style={{ color: '#002D62' }}></i></a></li>
                            <li className="list-inline-item fs-2 me-4"><a href="/"><i className="bi bi-twitter-x" style={{ color: '#002D62' }}></i></a></li>
                        </ul>

                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <p className="text-center">© 2024 Sky Airlines All rights reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
