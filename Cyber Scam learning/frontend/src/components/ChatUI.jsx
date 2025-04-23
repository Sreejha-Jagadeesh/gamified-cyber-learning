import React, { useState, useEffect } from "react";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import AvatarViewer from "./AvatarViewer";
import "./ChatUI.css";

const UserAvatar = () => {
  const { scene } = useGLTF("/user_avatar.glb");
  return <primitive object={scene} scale={5} position={[0, -6.5, 0]} />;
};

const ChatUI = () => {
  const [episodeId, setEpisodeId] = useState(1);
  const [step, setStep] = useState(0);
  const [scammerMessage, setScammerMessage] = useState("Loading...");
  const [audioUrl, setAudioUrl] = useState(null);
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);

  useEffect(() => {
    startScenario();
  }, []);

  const startScenario = async () => {
    try {
      setLoading(true);
      setStep(0);
      const res = await axios.post("http://localhost:8000/interact", {
        episode_id: episodeId,
        step: 0,
        user_choice: "",
      });

      setScammerMessage(res.data.scammer_message);
      setAudioUrl(res.data.audio_url);
      setChoices(res.data.choices.map((choice) => choice.text));
      setConversationEnded(false);
      playAudio(res.data.audio_url);
    } catch (err) {
      console.error(err);
      setScammerMessage("Failed to load scammer scenario.");
      setChoices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChoiceClick = async (choice) => {
    if (choice === "Retry") {
      startScenario();
      return;
    }
    if (choice === "Exit") {
      setScammerMessage("Thanks for playing! 🚀");
      setChoices([]);
      setConversationEnded(true);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/interact", {
        episode_id: episodeId,
        step: step + 1,
        user_choice: choice,
      });

      setScammerMessage(res.data.scammer_message);
      setAudioUrl(res.data.audio_url);
      playAudio(res.data.audio_url);

      if (
        res.data.scammer_message.includes("scammed") ||
        res.data.scammer_message.includes("escaped")
      ) {
        setChoices(["Retry", "Exit"]);
        setConversationEnded(true);
      } else {
        setChoices(res.data.choices.map((choice) => choice.text));
        setStep((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
      setScammerMessage("Something went wrong. Try again!");
      setChoices(["Retry", "Exit"]);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (url) => {
    if (url) {
      const audio = new Audio(url);
      audio.play();
    }
  };

  return (
    <div className="chat-container">
      {/* User Avatar */}
      <div className="avatar-section user-avatar-section">
        <Canvas camera={{ position: [1, 1.5, 6], fov: 100 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 5, 2]} />
          <UserAvatar />
          <OrbitControls enableZoom={false} />
        </Canvas>
        <div className="user-label">You</div>
      </div>

      {/* Chat */}
      <div className="chat-area">
        <div className="scammer-message">{scammerMessage}</div>
        <div className="option-boxes">
          {choices.map((choice, index) => (
            <div key={index} className="option-box" onClick={() => handleChoiceClick(choice)}>
              {choice}
            </div>
          ))}
        </div>
      </div>

      {/* Scammer Avatar */}
      <div className="avatar-section scammer-avatar-section">
        <Canvas camera={{ position: [1, 1.5, 6], fov: 100 }}>
          <ambientLight />
          <AvatarViewer />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default ChatUI;
