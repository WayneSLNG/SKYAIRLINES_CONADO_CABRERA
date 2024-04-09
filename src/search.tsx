import React, { useState } from 'react';
import FlightSummary from './flightSummary';
import Modal from './Modal';
import './search.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const locations = ['Manila', 'Cebu', 'Clark'];

function Search() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [tripType, setTripType] = useState('roundtrip');
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [infantCount, setInfantCount] = useState(0);
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    const handleSearch = () => {
        if (origin.trim() === '' || destination.trim() === '') {
            setModalMessage('Please select origin and destination');
            setModalOpen(true);
            return;
        }

        if (origin === destination) {
            setModalMessage('Origin and destination cannot be the same');
            setModalOpen(true);
            return;
        }

        if (departureDate === '' || (tripType === 'roundtrip' && returnDate === '')) {
            setModalMessage('Please select both departure and return dates');
            setModalOpen(true);
            return;
        }

        const today = new Date();
        const departureDateObj = new Date(departureDate);
        if (departureDateObj < today) {
            setModalMessage('Departure date cannot be in the past');
            setModalOpen(true);
            return;
        }

        if (tripType === 'roundtrip') {
            const returnDateObj = new Date(returnDate);
            if (returnDateObj < departureDateObj) {
                setModalMessage('Return date cannot be earlier than departure date');
                setModalOpen(true);
                return;
            }

            const maxDateRange = new Date();
            maxDateRange.setDate(maxDateRange.getDate() + 365);
            if (returnDateObj > maxDateRange) {
                setModalMessage('Return date cannot be more than one year from today');
                setModalOpen(true);
                return;
            }
        }

        if (adultCount === 0) {
            setModalMessage('Please select at least one adult passenger');
            setModalOpen(true);
            return;
        }

        if (adultCount + childCount + infantCount > 9) {
            setModalMessage('Total passengers cannot exceed 9');
            setModalOpen(true);
            return;
        }

        setShowAnimation(true);
        setTimeout(() => {
            setSearchInitiated(true);
        }, 2000);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalMessage('');
    };

    return (
        <>
            <Modal isOpen={showAnimation} onClose={() => setShowAnimation(false)} />

            {!searchInitiated ? (
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-3">Search Flight</h4>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="tripType">Trip Type:</label>
                                <select id="tripType" className="form-control" value={tripType} onChange={(e) => setTripType(e.target.value)}>
                                    <option value="roundtrip">Round Trip</option>
                                    <option value="oneway">One Way</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="origin">Origin:</label>
                                <select id="origin" className="form-control" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                                    <option value="">Select Origin</option>
                                    {locations.map((location, index) => (
                                        <option key={index} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="destination">Destination:</label>
                                <select id="destination" className="form-control" value={destination} onChange={(e) => setDestination(e.target.value)}>
                                    <option value="">Select Destination</option>
                                    {locations.map((location, index) => (
                                        <option key={index} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="departureDate">Departure Date:</label>
                                <input id="departureDate" type="date" className="form-control" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
                            </div>
                            {tripType === 'roundtrip' && (
                                <div className="col">
                                    <label htmlFor="returnDate">Return Date:</label>
                                    <input id="returnDate" type="date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                                </div>
                            )}
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="adultCount">Adults:</label>
                                <input id="adultCount" type="number" className="form-control" value={adultCount} onChange={(e) => setAdultCount(parseInt(e.target.value))} />
                            </div>
                            <div className="col">
                                <label htmlFor="childCount">Children:</label>
                                <input id="childCount" type="number" className="form-control" value={childCount} onChange={(e) => setChildCount(parseInt(e.target.value))} />
                            </div>
                            <div className="col">
                                <label htmlFor="infantCount">Infants:</label>
                                <input id="infantCount" type="number" className="form-control" value={infantCount} onChange={(e) => setInfantCount(parseInt(e.target.value))} />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col d-flex justify-content-end">
                                <button className="btn btn-primary" onClick={handleSearch}>Search Flights</button>
                            </div>
                        </div>
                    </div>

                    {modalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <p className='fs-5 text-center'>{modalMessage}</p>
                                <div className='row'>
                                    <div className='col d-flex justify-content-end'>
                                    <button className="btn btn-primary me-2" onClick={closeModal}>Back</button>
                                    <button className="btn btn-primary" onClick={closeModal}>Okay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <FlightSummary
                    origin={origin}
                    destination={destination}
                    tripType={tripType}
                    departureDate={departureDate}
                    returnDate={returnDate}
                    adultCount={adultCount}
                    childCount={childCount}
                    infantCount={infantCount}
                />
            )}
        </>
    );
}

export default Search;
