// src/pages/SOS.jsx
import { useEffect } from "react";
import "./SOS.css";

export default function SOS() {
  const handleSOS = () => {
    // Get location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const phoneNumber = "+917339113033"; // Replace with your number
        const message = `Emergency SOS! Location: https://maps.google.com/?q=${latitude},${longitude}`;

        window.open(
          `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
          )}`,
          "_blank"
        );

        alert("Sharing location via WhatsApp...");
      },
      () => {
        alert("location saved");
      }
    );

    // Start recording (demo alert)
    alert("Recording video and audio (this is a demo)...");
  };

  return (
    <div className="sos-page">
      <button className="big-sos-button" onClick={handleSOS}>
        SOS
      </button>
    </div>
  );
}
