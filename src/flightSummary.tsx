import React, { useState, useEffect } from "react";
import PassengerForm from "./passengerForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./flightsumm.css";

interface FlightSummaryProps {
  origin: string;
  destination: string;
  tripType: string;
  departureDate: string;
  returnDate?: string;
  adultCount: number;
  childCount: number;
  infantCount: number;
}

const locations = ["Manila", "Cebu", "Clark"];

function FlightSummary({
  origin,
  destination,
  tripType,
  departureDate,
  returnDate,
  adultCount,
  childCount,
  infantCount,
}: FlightSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [redirectToPassengerForm, setRedirectToPassengerForm] = useState(false);

  const distances: { [key: string]: number } = {
    "Manila-Cebu": 500,
    "Manila-Clark": 300,
    "Cebu-Clark": 400,
    "Cebu-Manila": 500,
    "Clark-Manila": 300,
    "Clark-Cebu": 400,
  };

  const route = `${origin}-${destination}`;
  const distance = distances[route];

  const pricePerKm = 0.1;
  const adultPrice = 100;
  const childPrice = 50;
  const infantPrice = 25;

  useEffect(() => {
    let calculatedTotalPrice: number;
    if (tripType === "roundtrip") {
      calculatedTotalPrice =
        2 *
        (distance * pricePerKm) *
        (adultCount * adultPrice +
          childCount * childPrice +
          infantCount * infantPrice);
    } else {
      calculatedTotalPrice =
        distance *
        pricePerKm *
        (adultCount * adultPrice +
          childCount * childPrice +
          infantCount * infantPrice);
    }

    let calculatedDiscount = 0;
    if (promoCode === "FLIGHT50") {
      calculatedDiscount = calculatedTotalPrice * 0.5;
    }

    setTotalPrice(calculatedTotalPrice);
    setDiscount(calculatedDiscount);
  }, [
    promoCode,
    origin,
    destination,
    tripType,
    departureDate,
    returnDate,
    adultCount,
    childCount,
    infantCount,
    distance,
    pricePerKm,
    adultPrice,
    childPrice,
    infantPrice,
  ]);

  const handleProceed = () => {
    setRedirectToPassengerForm(true);
  };

  if (redirectToPassengerForm) {
    return (
      <PassengerForm
        adultCount={adultCount}
        childCount={childCount}
        infantCount={infantCount}
        totalPrice={totalPrice}
        discount={discount}
        tripType={tripType}
        origin={origin}
        destination={destination}
        departureDate={departureDate}
        returnDate={returnDate}
      />
    );
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-3">Flight Summary</h4>
          <div className="row mb-2">
            <p className="col">
              <strong>Trip Type:</strong> {tripType}
            </p>
          </div>

          <div className="row mb-2">
            <div className="col">
              <label className="fw-bolder">Origin:</label>
              <p className="col">{origin}</p>
            </div>

            <div className="col">
              <label className="fw-bolder">Destination:</label>
              <p className="col">{destination}</p>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col">
              <label className="fw-bolder">Departure Date:</label>
              <p className="col">{departureDate}</p>
            </div>

            <div className="col">
              {tripType === "roundtrip" && (
                <>
                  <label className="fw-bolder">Return Date:</label>
                  <p className="col">{returnDate}</p>
                </>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="fw-bolder">Adults:</label>
              <p className="col">{adultCount}</p>
            </div>

            <div className="col">
              <label className="fw-bolder">Children:</label>
              <p className="col">{childCount}</p>
            </div>

            <div className="col">
              <label className="fw-bolder">Infants:</label>
              <p className="col">{infantCount}</p>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item mb-2">
            <label className="fw-bolder" htmlFor="promoCode">Promo Code:</label>
            <input
              type="text"
              id="promoCode"
              className="form-control"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </li>
          <li className="list-group-item mb-2 ">
            <div className="col d-flex justify-content-end">
              <h5>Total Price: ₱{(totalPrice - discount).toFixed(2)}</h5>
            </div>

            <div className="col d-flex justify-content-end">
              <button className="btn btn-primary mt-2" onClick={handleProceed}>
                Proceed
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default FlightSummary;
