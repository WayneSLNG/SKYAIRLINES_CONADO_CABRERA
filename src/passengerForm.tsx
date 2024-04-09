import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './passengerform.css';

interface PassengerFormProps {
    adultCount: number;
    childCount: number;
    infantCount: number;
    totalPrice: number;
    origin: string;
    destination: string;
    tripType: string;
    departureDate: string;
    returnDate?: string;
    discount: number;
}

const PassengerForm: React.FC<PassengerFormProps> = ({ adultCount, childCount, infantCount, totalPrice, origin, destination, tripType, departureDate, returnDate, discount }) => {
    const [showModal, setShowModal] = useState(false);
    const [showThankYouModal, setShowThankYouModal] = useState(false);
    const [passengerDetails, setPassengerDetails] = useState<Array<{ firstName: string, middleName: string, lastName: string, birthday: string, nationality: string, type: string }>>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    useEffect(() => {
        const initializePassengers = () => {
            const passengers = [];
            for (let i = 0; i < adultCount + childCount + infantCount; i++) {
                let passengerType = '';
                if (i < adultCount) {
                    passengerType = 'Adult';
                } else if (i < adultCount + childCount) {
                    passengerType = 'Child';
                } else {
                    passengerType = 'Infant';
                }
                passengers.push({ firstName: '', middleName: '', lastName: '', birthday: '', nationality: '', type: passengerType });
            }
            setPassengerDetails(passengers);
        };
        initializePassengers();
    }, [adultCount, childCount, infantCount]);

    useEffect(() => {
        if (showThankYouModal) {
            setTimeout(() => {
                setShowThankYouModal(false);
                window.location.reload();
            }, 3000);
        }
    }, [showThankYouModal]);

    const handleSubmit = () => {
        const isEmpty = passengerDetails.some(details => Object.values(details).some(value => value.trim() === ''));

        if (isEmpty) {
            setErrorMessage('Please fill in all passenger details.');
        } else {
            setShowModal(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
        const updatedDetails = [...passengerDetails];
        updatedDetails[index] = {
            ...updatedDetails[index],
            [field]: e.target.value
        };
        setPassengerDetails(updatedDetails);
    };


    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const handleFinish = () => {
        setShowModal(false);
        setShowThankYouModal(true);
    };

    return (
            <div className="card">
                <div className="card-body">
                    <h2>Passenger Form</h2>
                    {passengerDetails.map((passenger, index) => (
                        <div key={index}>
                            <h3>{passenger.type} {index + 1}</h3>
                            <div className="row">
                                <div className="form-group col-md-4">
                                    <label>First Name:</label>
                                    <input type="text" className="form-control" value={passenger.firstName} onChange={(e) => handleInputChange(e, index, 'firstName')} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Middle Name:</label>
                                    <input type="text" className="form-control" value={passenger.middleName} onChange={(e) => handleInputChange(e, index, 'middleName')} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Last Name:</label>
                                    <input type="text" className="form-control" value={passenger.lastName} onChange={(e) => handleInputChange(e, index, 'lastName')} />
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="form-group col-md-6">
                                    <label>Birthday:</label>
                                    <input type="date" className="form-control" value={passenger.birthday} onChange={(e) => handleInputChange(e, index, 'birthday')} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Nationality:</label>
                                    <input type="text" className="form-control" value={passenger.nationality} onChange={(e) => handleInputChange(e, index, 'nationality')} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="form-group mt-3">
                        <label>Select Payment Method:</label>
                        <select className="form-control mb-3" value={selectedPaymentMethod} onChange={handlePaymentMethodChange}>
                            <option value="">Select Payment Method</option>
                            <option value="Gcash">Gcash</option>
                            <option value="paypal">PayPal</option>
                            <option value="credit card">Credit Card</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>

                    {errorMessage && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    {showModal && (
                        <div className="modal" tabIndex={-1} role="dialog">
                            <div className="modal-dialog " role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">Payment Method: {selectedPaymentMethod.toUpperCase()}</h4>
                                    </div>
                                    <div className="modal-body">
                                    <h4 className="modal-title mb-3">Flight Summary</h4>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                            <label htmlFor="" className="fw-bolder">Trip Type:</label>
                                            <p>{tripType}</p>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col'>
                                            <label htmlFor="" className="fw-bolder">Destiantion:</label>
                                            <p>{destination}</p>
                                            </div>

                                            <div className='col'>
                                            <label htmlFor="" className="fw-bolder">Origin:</label>
                                            <p>{origin}</p>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col'>
                                            <label htmlFor="" className="fw-bolder">Departure:</label>
                                            <p>{departureDate}</p>
                                            </div>

                                            <div className='col'>
                                            {returnDate && (
                                        <>
                                            <label htmlFor="" className="fw-bolder">Departure:</label>
                                            <p>{returnDate}</p>
                                        </>
                                        )}
                                            </div>
                                        </div>

                                        <div className='row mb-3'>
                                            <div className='col'>
                                                <label htmlFor="" className="fw-bolder">Total:</label>
                                                <p>₱{(totalPrice - discount).toFixed(2)}</p>
                                            </div>
                                        </div>
                                     
                                        <h4 className="modal-title mb-3">Passenger Details</h4>
                                        {passengerDetails.map((passenger, index) => (
                                            <div key={index}>
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                    <h5>{passenger.type} {index + 1}</h5>
                                                </div>
                                                </div>

                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <label htmlFor="" className="fw-bolder">Fullname:</label>
                                                        <p>{passenger.firstName} {passenger.middleName} {passenger.lastName}</p>
                                                    </div>
                                                </div>

                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <label htmlFor="" className="fw-bolder">Birthday:</label>
                                                        <p>{passenger.birthday}</p>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label htmlFor="" className="fw-bolder">Nationality:</label>
                                                        <p>{passenger.nationality}</p>
                                                    </div>
                                                </div>

                                            </div>

                                            
                                        ))}
                                        {selectedPaymentMethod === 'gcash' && (
                                            <div className="mt-3">
                                                <h4 className='mb-3'>GCash Payment Form</h4>
                                                <label htmlFor="" className="fw-bolder">Gcash No.</label>
                                                <input type="text" className='form-control mb-2' placeholder="GCash Number :" />
                                                <label htmlFor="" className="fw-bolder">Full Name:</label>
                                                <input type="text" className='form-control mb-2' placeholder="Full Name :" />                                                
                                                <label htmlFor="" className="fw-bolder">Amount</label>
                                                <input type="text" className='form-control' placeholder="Amount :" />
                                            </div>
                                        )}
                                        {selectedPaymentMethod === 'paypal' && (
                                            <div className="mt-3">
                                                <h4 className='mb-3'>PayPal Payment Form</h4>
                                                <label htmlFor="" className="fw-bolder">Email</label>
                                                <input type="email" className='form-control mb-2' placeholder="Email" />
                                                <label htmlFor="" className="fw-bolder">Amount</label>
                                                <input type="text" className='form-control' placeholder="Amount" />
                                            </div>
                                        )}
                                        {selectedPaymentMethod === 'credit card' && (
                                            <div className="mt-3">
                                                <h4 className='mb-3'>Credit Card Payment Form</h4>
                                                <label htmlFor="" className="fw-bolder">Card No.</label>
                                                <input type="text" className='form-control mb-2' placeholder="Card No" />
                                                <label htmlFor="" className="fw-bolder">Name: </label>
                                                <input type="text" className='form-control mb-2' placeholder="Name" />
                                                <label htmlFor="" className="fw-bolder">Expiration Date: </label>
                                                <input type="Date" className='form-control mb-2'/>
                                                <label htmlFor="" className="fw-bolder">CVV</label>
                                                <input type="text" className='form-control mb-2' placeholder="CVV" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>Cancel</button>
                                        <button type="button" className="btn btn-primary" onClick={handleFinish}>Proceed</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {showThankYouModal && (
                        <div className="modal fade show" tabIndex={-1} role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content custom-modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Thank You! for using Sky Airlines</h5>
                                    </div>
                                    <div className="modal-body">
                                        <span className="checkmark">&#10004;</span>
                                        <p>Your booking has been confirmed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
};

export default PassengerForm;
