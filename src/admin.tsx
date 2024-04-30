import React, { useState } from "react";
import "./admin.css";
import logo from "./images/SAlogo.png";

const Admin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const [flights, setFlights] = useState<any[]>([]);
  const [newFlight, setNewFlight] = useState({
    id: "",
    name: "",
    origin: "",
    destination: "",
    departureTime: "",
  });
  const [editingFlightId, setEditingFlightId] = useState<string | null>(null);

  const addFlight = (event: React.FormEvent): void => {
    event.preventDefault();
    setFlights([...flights, newFlight]);
    setNewFlight({
      id: "",
      name: "",
      origin: "",
      destination: "",
      departureTime: "",
    });
  };

  const deleteFlight = (id: string) => {
    setFlights(flights.filter((flight) => flight.id !== id));
  };

  const editFlight = (id: string) => {
    setEditingFlightId(id);
    const flightToEdit = flights.find((flight) => flight.id === id);
    if (flightToEdit) {
      setNewFlight(flightToEdit);
    }
  };

  const updateFlight = () => {
    setFlights((prevFlights) =>
      prevFlights.map((flight) =>
        flight.id === editingFlightId ? newFlight : flight
      )
    );
    setEditingFlightId(null);
    setNewFlight({
      id: "",
      name: "",
      origin: "",
      destination: "",
      departureTime: "",
    });
  };

  const [promos, setPromos] = useState<any[]>([]);
  const [promoCode, setPromoCode] = useState({
    code: "",
    discount: 0,
  });

  const addPromoCode = (event: React.FormEvent): void => {
    event.preventDefault();
    // Ensure the promo code is unique before adding
    if (!promos.some((promo) => promo.code === promoCode.code)) {
      setPromos([...promos, promoCode]);
      // Clear input fields after adding
      setPromoCode({ code: "", discount: 0 });
    } else {
      alert("Promo code already exists.");
    }
  };

  const deletePromoCode = (code: string) => {
    setPromos(promos.filter((promo) => promo.code !== code));
  };

  return (
    <div className="">
      {!isLoggedIn ? (
        <div className="login-container">
          <div className="container">
            <div className="row justify-content-center">
              <div className="card" style={{ maxWidth: "600px" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h2 className="card-title">Admin Login</h2>
                      <label className="mt-3">
                        <i className="bi bi-person"></i> Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />

                      <label className="mt-3">
                        <i className="bi bi-lock"></i> Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <div className="col mt-3 d-flex justify-content-end">
                        <button
                          className="btn btn-primary"
                          onClick={handleLogin}
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          Login <i className="bi bi-box-arrow-in-right"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-center">
                        <img
                          src={logo}
                          alt="Sky Airlines"
                          className="img-fluid"
                          style={{ maxWidth: "300px", height: "auto" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-2">
            <div className="sidebar" style={{ background: "#002D62" }}>
              <div className="text-center">
                <img
                  src={logo}
                  alt="Sky Airlines"
                  className="img-fluid"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              </div>

              <ul className="sidebar-list text-light">
                <li className="text-light">
                  <i className="bi bi-archive"></i> Flight Management
                </li>
                <li className="text-light">
                  <i className="bi bi-person"></i> Accounts
                </li>
                <li className="text-light">
                  <i className="bi bi-receipt"></i> Transactions
                </li>
                <li style={{ marginTop: "350px" }}>
                  <a
                    className="text-decoration-none text-light"
                    onClick={handleLogout}
                    href="#"
                  >
                    <i className="bi bi-box-arrow-left"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-10">
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-4">
                  <div className="addflight">
                    <h2 className="text-center">Add Flight</h2>
                    <form onSubmit={addFlight}>
                      <div className="form-group row mt-3">
                        <div className="col">
                          <label>Flight ID</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newFlight.id}
                            onChange={(e) =>
                              setNewFlight({
                                ...newFlight,
                                id: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col">
                          <label>Flight</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newFlight.name}
                            onChange={(e) =>
                              setNewFlight({
                                ...newFlight,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="form-group row mt-3">
                        <div className="col">
                          <label>Origin</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newFlight.origin}
                            onChange={(e) =>
                              setNewFlight({
                                ...newFlight,
                                origin: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col">
                          <label>Destination</label>
                          <input
                            type="text"
                            className="form-control"
                            value={newFlight.destination}
                            onChange={(e) =>
                              setNewFlight({
                                ...newFlight,
                                destination: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="form-group mt-3">
                        <label>Departure Time</label>
                        <input
                          type="date"
                          className="form-control"
                          value={newFlight.departureTime}
                          onChange={(e) =>
                            setNewFlight({
                              ...newFlight,
                              departureTime: e.target.value,
                            })
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-5 me-2"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Add Flight <i className="bi bi-plus"></i>
                      </button>
                      {editingFlightId && (
                        <button
                          type="submit"
                          className="btn btn-primary mt-5"
                          onClick={updateFlight}
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          Update Flight <i className="bi bi-pencil"></i>
                        </button>
                      )}
                    </form>
                  </div>
                </div>

                <div className="col-md-8">
                  <div className="flightlist">
                    <h2 className="text-center">Flight List</h2>

                    <div className="input-group mb-3 mt-3">
                      <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search Flight"
                        aria-label="Search"
                        aria-describedby="search-button"
                        style={{ maxWidth: "250px" }}
                      />
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        id="search-button"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Search <i className="bi bi-search"></i>
                      </button>
                    </div>

                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Flight</th>
                          <th scope="col">Origin</th>
                          <th scope="col">Destination</th>
                          <th scope="col">Departure Time</th>
                          <th scope="col">Controls</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flights.length > 0 ? (
                          flights.map((flight) => (
                            <tr key={flight.id}>
                              <td>{flight.id}</td>
                              <td>{flight.name}</td>
                              <td>{flight.origin}</td>
                              <td>{flight.destination}</td>
                              <td>{flight.departureTime}</td>
                              <td>
                                <button
                                  className="btn btn-success me-1"
                                  onClick={() => editFlight(flight.id)}
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteFlight(flight.id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center">
                              No Flight Record{" "}
                              <i className="bi bi-emoji-frown"></i>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-md-12 mt-5">
                  <div className="addpromo">
                    <h2 className="text-center">Add Promo Code</h2>
                    <form onSubmit={addPromoCode}>
                      <div className="form-group row mt-3">
                        <div className="col">
                          <label>Promo Code</label>
                          <input
                            type="text"
                            className="form-control"
                            value={promoCode.code}
                            onChange={(e) =>
                              setPromoCode({
                                ...promoCode,
                                code: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col">
                          <label>Discount (%)</label>
                          <input
  type="number"
  className="form-control"
  value={promoCode.discount}
  onChange={(e) =>
    setPromoCode({
      ...promoCode,
      discount: parseFloat(e.target.value), // Convert string to number
    })
  }
/>

                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary mt-5"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        Add Promo Code <i className="bi bi-tag-fill"></i>
                      </button>
                    </form>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="promolist">
                    <h2 className="text-center">Promo Code List</h2>

                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Code</th>
                          <th scope="col">Discount (%)</th>
                          <th scope="col">Controls</th>
                        </tr>
                      </thead>
                      <tbody>
                        {promos.length > 0 ? (
                          promos.map((promo) => (
                            <tr key={promo.code}>
                              <td>{promo.code}</td>
                              <td>{promo.discount}</td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deletePromoCode(promo.code)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="text-center">
                              No Promo Code <i className="bi bi-emoji-frown"></i>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
