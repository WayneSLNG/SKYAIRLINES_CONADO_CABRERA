import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import sea from './images/beach.jpg';

const Authentication: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [showSignUpSuccess, setShowSignUpSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Signing up with:', { username, password, email, firstName, middleName, lastName, birthday, gender });
    setSignUpUsername(username);
    setSignUpPassword(password);
    setIsSignedUp(true);
    setShowSignUpSuccess(true);
    setUsername('');
    setPassword('');
    setEmail('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setBirthday('');
    setGender('');
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Signing in with:', { signInUsername, signInPassword });
    setIsSignedIn(true);
    if (isSignedUp && signInUsername === signUpUsername && signInPassword === signUpPassword) {
      handleSignInSuccess();
    } else {
      setShowModal(true);
    }
    setSignInUsername('');
    setSignInPassword('');
  };

  const handleSignInSuccess = () => {
    setSignInSuccess(true);
    setTimeout(() => {
      setSignInSuccess(false);
      window.location.href = '/';
    }, 2000);
  };

  const handleTryAgain = () => {
    setSignInSuccess(false);
    setIsSignedIn(false);
    setShowModal(false);
  };

  useEffect(() => {
    if (showSignUpSuccess) {
      const timer = setTimeout(() => {
        setShowSignUpSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSignUpSuccess]);

  return (
    <div style={{ backgroundImage: `url(${sea})`, backgroundSize: 'cover', backgroundPosition: 'center', fontFamily: "'Oswald', sans-serif" }}>
      <Navbar />
      <div className="authentication-container">
      {!isSignedUp && (
      <div className="card mb-5">
          <div className="card-body">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>

              <div className='row mb-3'>
                <div className="col">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
                <div className="col">
                  <label className="form-label">Middle Name</label>
                  <input type="text" className="form-control" value={middleName} onChange={(e) => setMiddleName(e.target.value)}/>
                </div>
                <div className="col">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                </div>
              </div>

              <div className='row mb-3'>
                <div className="col">
                  <label className="form-label">Birthday</label>
                  <input type="date" className="form-control" value={birthday} onChange={(e) => setBirthday(e.target.value)} required/>
                </div>

                <div className="col">
                  <label className="form-label">Gender:</label>
                  <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
              </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required/>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>

              <div className="row mt-4">
                  <div className="col d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                  </div>
              </div>

            </form>
          </div>
        </div>
      )}

        {isSignedUp && !isSignedIn && (
          
          <div className="card" style={{marginBottom: '100px'}}>

            <div className="card-body">
              <h2>Sign In</h2>
              <form onSubmit={handleSignIn}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" value={signInUsername} onChange={(e) => setSignInUsername(e.target.value)} required/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
              </form>
            </div>
          </div>
        )}

        {showSignUpSuccess && (
          <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Success!</h5>
                  <button type="button" className="btn-close" onClick={() => setShowSignUpSuccess(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>You have successfully signed up.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isSignedIn && signInSuccess && (
          <div className="welcome" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Success!</h5>
                  <button type="button" className="btn-close" onClick={() => setSignInSuccess(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="checkmark">
                    <div className="checkmark__circle"></div>
                    <div className="checkmark__check"></div>
                  </div>
                  <p>Welcome   {signUpUsername}!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="error" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Invalid Details!   </h5>
                </div>
                <div className="modal-body">
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={handleTryAgain}>Try Again</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer/> 
    </div>
  );
};

export default Authentication;
