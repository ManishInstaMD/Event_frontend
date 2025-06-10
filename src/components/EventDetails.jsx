import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "./Login";
import axios from "axios";

const API_URL = "https://event-nine-xi.vercel.app/api/admin/event";

const EventDetails = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(API_URL);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setLoading(false);
    }
  };

  const now = new Date();
  const passedEvents = [];
  const upcomingEvents = [];

  events.forEach((event) => {
    const eventDate = new Date(event.dateTime || event.date);
    if (eventDate < now) passedEvents.push(event);
    else upcomingEvents.push(event);
  });

  upcomingEvents.sort(
    (a, b) => new Date(a.dateTime || a.date) - new Date(b.dateTime || b.date)
  );
  const currentEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  useEffect(() => {
    const carousel = document.querySelector("#highlightsCarousel");
    if (carousel && window.bootstrap) {
      new window.bootstrap.Carousel(carousel, {
        interval: 3000,
        ride: "carousel",
        pause: false,
        wrap: true,
      });
    }
  }, []);

  const isUserLoggedIn = () => localStorage.getItem("user") !== null;

  const handleJoinClick = (eventId) => {
    isUserLoggedIn()
      ? navigate(`/liveEvents/${eventId}`) // pass ID in route
      : setShowLoginPopup(true);
  };
  

  const closeLoginPopup = () => setShowLoginPopup(false);

  if (loading)
    return (
      <div className="text-white text-center my-5">⏳ Loading events...</div>
    );

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4 text-white fs-3">Our Events</h2>

      {currentEvent && (
        <div className="mb-5">
          <h4 className="fw-bold text-info mb-3 fs-5">
            🔥 Current & Upcoming Event
          </h4>

          <div className="card shadow border-0 rounded-4 p-3 p-md-4">
            <img
              src={currentEvent.image || currentEvent.coverImages?.[0]}
              alt="Current Event"
              className="img-fluid rounded mb-3 w-100"
              style={{
                objectFit: "cover",
                height: "auto",
                maxHeight: "400px",
              }}
            />
            <h4 className="fw-bold text-primary">{currentEvent.title}</h4>
            <p className="text-muted">{currentEvent.description}</p>
            <CountdownTimer
              targetDate={currentEvent.dateTime || currentEvent.date}
            />

            <p className="mb-1">
              <strong>Date:</strong>{" "}
              {new Date(currentEvent.date).toDateString()}
            </p>
            <p className="mb-1">
              <strong>Time:</strong> {currentEvent.time}
            </p>
            <p className="mb-3">
              <strong>Mode:</strong> {currentEvent.mode}
            </p>

            <button
              onClick={() => handleJoinClick(currentEvent._id)} // assume your events from DB have _id
              className="btn btn-outline-primary mb-3"
            >
              🔗 Watch Event
            </button>

            {showLoginPopup && (
              <div
                className="modal show d-block"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(3px)",
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1050,
                }}
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div
                    className="modal-content rounded-4 border-0 shadow"
                    style={{
                      backgroundImage: 'url("/images/bg3.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      color: "#fff",
                    }}
                  >
                    <div
                      className="modal-header border-0"
                      style={{ background: "rgba(0, 0, 0, 0.4)" }}
                    >
                      <h5 className="modal-title w-100 text-center fw-bold text-warning">
                        To Join The Event, Login Below 👇
                      </h5>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={closeLoginPopup}
                      ></button>
                    </div>
                    <div className="modal-body px-4 py-3">
                      <Login />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Highlights Grid */}
      {passedEvents.length > 0 && (
        <div className="mt-5">
          <h4 className="fw-bold text-white mb-4 fs-5">📽️ Event Highlights</h4>
          <div className="row justify-content-center g-4">
            {passedEvents.map((event, index) => (
              <div key={index} className="col-12 col-md-6">
                <div className="card h-100 shadow border-0 rounded-4">
                  <img
                    src={event.image || event.coverImages?.[0]}
                    alt={`Highlight ${index}`}
                    className="card-img-top rounded-top"
                    style={{
                      objectFit: "contain",
                      height: "220px",
                    }}
                  />
                  <div className="card-body bg-white p-3 d-flex flex-column">
                    <h5 className="fw-bold text-primary">{event.title}</h5>
                    <p className="text-muted small">{event.description}</p>
                    <p className="mb-1">
                      <strong>Date:</strong>{" "}
                      {new Date(event.date).toDateString()}
                    </p>
                    <p className="mb-1">
                      <strong>Time:</strong> {event.time}
                    </p>
                    <p className="mb-3">
                      <strong>Mode:</strong> {event.mode}
                    </p>
                    <button
                      onClick={() => window.open(event.eventLink, "_blank")}
                      className="btn btn-outline-primary mt-auto"
                    >
                      🔗 Watch Highlight
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
