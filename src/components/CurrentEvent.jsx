import React, { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaGlobe } from "react-icons/fa";
import Login from "./Login";

const CurrentEvent = () => {
  const navigate = useNavigate();

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const isUserLoggedIn = () => {
    return localStorage.getItem("userToken") !== null; // Replace with your actual login logic
  };

  const handleJoinClick = () => {
    if (isUserLoggedIn()) {
      navigate("/liveEvents");
    } else {
      setShowLoginPopup(true);
    }
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const event = {
    title: "Data To Decision",
    subtitle: "#PitchPoint Ep. 2",
    description:
      "In today’s dynamic pharma landscape, data isn’t just numbers — it’s the foundation of smart strategy and impactful decisions. Join us for a power-packed 45-minute session with a visionary panel of industry leaders who’ve been at the forefront of transforming insights into real-world outcomes.",
    date: "June 07, 2025",
    time: "11:00 AM onwards",
    dateTime: "2025-06-07T11:00:00",
    duration: "45 Minutes",
    mode: "Online Event",
    eventLink: "https://e-commerce-platform-ozvf.vercel.app/liveEvents",
    youtubeLink: "https://www.youtube.com/watch?v=qJvclEApNrE",
    speakers: [
      {
        name: "Dr. Subhojit Mukherjee",
        title: "Head of India Formulations, Celsius Healthcare Pvt. Ltd.",
      },
      {
        name: "Mr. Devesh Gangani",
        title: "AGM, Alkem Laboratories Ltd.",
      },
      {
        name: "Dr. Pramod Kumar Rajput",
        title: "Global Leadership Coach | Sr. VP (F.), Cadila Pharma",
      },
      {
        name: "Dr. ICS Varma",
        title:
          "Co-Founder, Regson Healthcare | Live Pharma Coalition | ExpertOnBoard",
      },
    ],
    coverImage: "/images/EventData2.jpg",
  };

  return (
    <div className="event-wrapper py-5">
      <div className="container">
        <h1 className="text-center fw-bold display-5 mb-4">Upcoming Event</h1>

        <div className="event-flex-wrapper">
          {/* Left: Text Content */}
          <div className="event-text">
            <span className="badge bg-white text-dark mb-2 w-fit-content">
              {event.subtitle}
            </span>

            <h2 className="fw-bold text-dark">{event.title}</h2>
            <p className="text-[#2e2e2e ] fs-5">{event.description}</p>

            <CountdownTimer targetDate={event.dateTime} />

            <div className="event-info mb-3">
              <p className="text-dark">
                <FaCalendarAlt className="me-2 text-primary" />
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-dark">
                <FaClock className="me-2 text-primary" />
                <strong>Time:</strong> {event.time} ({event.duration})
              </p>
              <p className="text-dark">
                <FaGlobe className="me-2 text-primary" />
                <strong>Mode:</strong> {event.mode}
              </p>
            </div>

            {/* Updated Join Button */}
            <button
              onClick={handleJoinClick}
              className="btn btn-light btn-lg px-4 rounded-pill mt-3"
            >
              🔗 Join on ExpertOnBoard
            </button>

            {/* Login Popup */}
            {showLoginPopup && (
              <div
                className="modal show d-block"
                tabIndex="-1"
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
                      <h5
                        className="modal-title w-100 text-center fw-bold"
                        style={{ color: "#F1C40F" }}
                      >
                        To Join The Event, Login Below 👇
                      </h5>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={closeLoginPopup}
                      ></button>
                    </div>
                    <div
                      className="modal-body px-4 py-3"
                      style={{
                        borderRadius: "0 0 1rem 1rem",
                      }}
                    >
                      <Login />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h5 className="fw-semibold text-dark">Speakers:</h5>
              <ul className="list-unstyled">
                {event.speakers.map((spk, i) => (
                  <li key={i} className="mb-1">
                    <strong className="">{spk.name}</strong>{" "}
                    <small className="text-muted">— {spk.title}</small>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate("/events")}
              className="btn btn-light btn-lg px-4 rounded-pill mt-3"
            >
              View More Events
            </button>
          </div>

          {/* Right: Image */}
          <div className="event-image-container">
            <img src={event.coverImage} alt="Event" className="event-image" />
          </div>
        </div>
      </div>

      <style>{`
      
        .event-wrapper {
          background:#d3aaa0;
          backdrop-filter: blur(4px);
          color: #1a1a1a;
        }

        .event-flex-wrapper {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .event-text {
          flex: 1;
          min-width: 300px;
          margin-bottom: 2rem;
        }

        .event-image-container {
          flex: 1;
          min-width: 300px;
          text-align: center;
        }

        .event-image {
          max-width: 90%;
          border-radius: 1rem;
          transition: transform 0.4s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
        }

        .event-image:hover {
          transform: scale(1.03);
        }

        .event-info p {
          margin: 0.4rem 0;
          display: flex;
          align-items: center;
        }

        .w-fit-content {
          width: fit-content;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .event-flex-wrapper {
            flex-direction: column;
            text-align: left;
          }

          .event-image-container {
            order: 2;
            margin-top: 1.5rem;
          }

          .event-text {
            order: 1;
          }

          .event-image {
            width: 100%;
          }
        }
          
      `}</style>
    </div>
  );
};

export default CurrentEvent;
