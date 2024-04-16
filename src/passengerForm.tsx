import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./passengerform.css";

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

const PassengerForm: React.FC<PassengerFormProps> = ({
  adultCount,
  childCount,
  infantCount,
  totalPrice,
  origin,
  destination,
  tripType,
  departureDate,
  returnDate,
  discount,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState<
    Array<{
      firstName: string;
      middleName: string;
      lastName: string;
      birthday: string;
      nationality: string;
      type: string;
    }>
  >([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    const initializePassengers = () => {
      const passengers = [];
      for (let i = 0; i < adultCount + childCount + infantCount; i++) {
        let passengerType = "";
        if (i < adultCount) {
          passengerType = "Adult";
        } else if (i < adultCount + childCount) {
          passengerType = "Child";
        } else {
          passengerType = "Infant";
        }
        passengers.push({
          firstName: "",
          middleName: "",
          lastName: "",
          birthday: "",
          nationality: "",
          type: passengerType,
        });
      }
      setPassengerDetails(passengers);
    };
    initializePassengers();
  }, [adultCount, childCount, infantCount]);

  useEffect(() => {
    if (showThankYouModal) {
      setTimeout(() => {
        setShowThankYouModal(false);
        window.location.href = "/about";
      }, 3000);
    }
  }, [showThankYouModal]);

  const handleSubmit = () => {
    const isEmpty = passengerDetails.some((details) =>
      Object.values(details).some((value) => value.trim() === "")
    );

    if (isEmpty) {
      setErrorMessage("Please fill in all passenger details.");
    } else if (selectedPaymentMethod === "") {
      setErrorMessage("Please select a payment method.");
    } else {
      setShowModal(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: e.target.value,
    };
    setPassengerDetails(updatedDetails);
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleFinish = () => {
    if (selectedPaymentMethod === "paypal") {
      if (!paypalValidation()) {
        return;
      }
    } else if (selectedPaymentMethod === "credit card") {
      if (!creditCardValidation()) {
        return;
      }
    }
    setShowModal(false);
    setShowThankYouModal(true);
  };

  const paypalValidation = () => {
    const emailInput = document.getElementById(
      "paypal-email"
    ) as HTMLInputElement | null;
    const amountInput = document.getElementById(
      "paypal-amount"
    ) as HTMLInputElement | null;

    if (!emailInput || !amountInput) {
      alert("Please fill in all PayPal details.");
      return false;
    }

    const email = emailInput.value.trim();
    const amount = amountInput.value.trim();

    if (!email || !amount) {
      alert("Please fill in all PayPal details.");
      return false;
    }

    return true;
  };

  const creditCardValidation = () => {
    const cardNoInput = document.getElementById(
      "credit-card-no"
    ) as HTMLInputElement | null;
    const nameInput = document.getElementById(
      "credit-card-name"
    ) as HTMLInputElement | null;
    const expirationInput = document.getElementById(
      "credit-card-expiration"
    ) as HTMLInputElement | null;
    const cvvInput = document.getElementById(
      "credit-card-cvv"
    ) as HTMLInputElement | null;

    if (!cardNoInput || !nameInput || !expirationInput || !cvvInput) {
      alert("Please fill in all Credit Card details.");
      return false;
    }

    const cardNo = cardNoInput.value.trim();
    const name = nameInput.value.trim();
    const expirationDate = expirationInput.value.trim();
    const cvv = cvvInput.value.trim();

    if (!cardNo || !name || !expirationDate || !cvv) {
      alert("Please fill in all Credit Card details.");
      return false;
    }

    return true;
  };

  return (
    <div className="card" style={{ fontFamily: "'Oswald', sans-serif" }}>
      <div className="card-body">
        <h2>Passenger Form</h2>
        {passengerDetails.map((passenger, index) => (
          <div key={index}>
            <h3>
              {passenger.type} {index + 1}
            </h3>
            <div className="row">
              <div className="form-group col-md-4">
                <label>First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={passenger.firstName}
                  onChange={(e) => handleInputChange(e, index, "firstName")}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Middle Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={passenger.middleName}
                  onChange={(e) => handleInputChange(e, index, "middleName")}
                />
              </div>
              <div className="form-group col-md-4">
                <label>Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={passenger.lastName}
                  onChange={(e) => handleInputChange(e, index, "lastName")}
                />
              </div>
            </div>
            <div className="row mb-5">
              <div className="form-group col-md-6">
                <label>Birthday:</label>
                <input
                  type="date"
                  className="form-control"
                  value={passenger.birthday}
                  onChange={(e) => handleInputChange(e, index, "birthday")}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Nationality:</label>
                <input
                  type="text"
                  className="form-control"
                  value={passenger.nationality}
                  onChange={(e) => handleInputChange(e, index, "nationality")}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="form-group mt-3">
          <select
            className="form-control mb-3"
            value={selectedPaymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="">Select Payment Method</option>
            <option value="paypal">PayPal</option>
            <option value="credit card">Credit Card</option>
          </select>
        </div>

        <div className="row mt-3">
          <div className="col d-flex justify-content-end">
            <button
              className="btn btn-primary me-2"
              onClick={() => window.history.back()}
            >
              <i className="bi bi-arrow-left"></i>Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit <i className="bi bi-check2"></i>
            </button>
          </div>
        </div>

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
                  <h4 className="modal-title text-dark">
                    Payment Method: {selectedPaymentMethod.toUpperCase()}
                  </h4>
                </div>
                <div className="modal-body">
                  <h4 className="modal-title mb-3 text-dark">Flight Summary</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="" className="fw-bolder">
                        Trip Type:
                      </label>
                      <p>{tripType}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label htmlFor="" className="fw-bolder">
                        Destiantion:
                      </label>
                      <p>{destination}</p>
                    </div>

                    <div className="col">
                      <label htmlFor="" className="fw-bolder">
                        Origin:
                      </label>
                      <p>{origin}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label htmlFor="" className="fw-bolder">
                        Departure:
                      </label>
                      <p>{departureDate}</p>
                    </div>

                    <div className="col">
                      {returnDate && (
                        <>
                          <label htmlFor="" className="fw-bolder">
                            Departure:
                          </label>
                          <p>{returnDate}</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="" className="fw-bolder">
                        Total:
                      </label>
                      <p>₱{(totalPrice - discount).toFixed(2)}</p>
                    </div>
                  </div>

                  <h4 className="modal-title mb-3 text-dark">
                    Passenger Details
                  </h4>
                  {passengerDetails.map((passenger, index) => (
                    <div key={index}>
                      <div className="row">
                        <div className="col-md-6">
                          <h5>
                            {passenger.type} {index + 1}
                          </h5>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <label htmlFor="" className="fw-bolder">
                            Fullname:
                          </label>
                          <p>
                            {passenger.firstName} {passenger.middleName}{" "}
                            {passenger.lastName}
                          </p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="" className="fw-bolder">
                            Birthday:
                          </label>
                          <p>{passenger.birthday}</p>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="" className="fw-bolder">
                            Nationality:
                          </label>
                          <p>{passenger.nationality}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {selectedPaymentMethod === "paypal" && (
                    <div className="mt-3 ">
                      <h4 className="mb-3 text-dark">PayPal Payment Form</h4>
                      <label htmlFor="" className="fw-bolder">
                        Email
                      </label>
                      <input
                        id="paypal-email"
                        type="email"
                        className="form-control mb-2"
                        placeholder="Email"
                      />
                      <label htmlFor="" className="fw-bolder">
                        Amount
                      </label>
                      <input
                        id="paypal-amount"
                        type="text"
                        className="form-control"
                        placeholder="Amount"
                      />
                    </div>
                  )}
                  {selectedPaymentMethod === "credit card" && (
                    <div className="mt-3">
                      <h4 className="mb-3 text-dark">
                        Credit Card Payment Form
                      </h4>
                      <label htmlFor="" className="fw-bolder">
                        Card No.
                      </label>
                      <input
                        id="credit-card-no"
                        type="text"
                        className="form-control mb-2"
                        placeholder="Card No"
                      />
                      <label htmlFor="" className="fw-bolder">
                        Name:{" "}
                      </label>
                      <input
                        id="credit-card-name"
                        type="text"
                        className="form-control mb-2"
                        placeholder="Name"
                      />
                      <label htmlFor="" className="fw-bolder">
                        Expiration Date:{" "}
                      </label>
                      <input
                        id="credit-card-expiration"
                        type="Date"
                        className="form-control mb-2"
                      />
                      <label htmlFor="" className="fw-bolder">
                        CVV
                      </label>
                      <input
                        id="credit-card-cvv"
                        type="text"
                        className="form-control mb-2"
                        placeholder="CVV"
                      />
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  >
                    <i className="bi bi-x-lg"></i> Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleFinish}
                  >
                    Proceed <i className="bi bi-check2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showThankYouModal && (
          <div
            className="modal fade show d-flex justify-content-center align-items-center"
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content custom-modal-content">
                <div className="modal-body text-center">
                  <h5 className="modal-title">
                    Thank You! for using Sky Airlines
                  </h5>
                  <span className="checkmark">&#10003;</span>
                  <p>Your booking has been confirmed...</p>
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
