// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [step, setStep] = useState(1);
//   const [message, setMessage] = useState("");
//   const [choices, setChoices] = useState([]);

//   const fetchDialogue = async () => {
//     const { data } = await axios.post("http://127.0.0.1:8000/interact"
// , {
//       episode_id: 1,
//       step,
//     });
//     setMessage(data.scammer_message);
//     setChoices(data.choices);
//   };

//   const handleChoice = (choice) => {
//     alert(choice.safe ? "✅ You avoided the scam!" : "❌ You got scammed!");
//     setStep(step + 1);
//     fetchDialogue();
//   };

//   useEffect(() => {
//     fetchDialogue();
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>💻 Cyber Scam Learning Platform</h1>
//       <div style={styles.chatBox}>
//         <p><strong>Scammer:</strong> {message}</p>
//       </div>
//       <div style={styles.choices}>
//         {choices.map((choice, index) => (
//           <button
//             key={index}
//             onClick={() => handleChoice(choice)}
//             style={{
//               ...styles.button,
//               backgroundColor: choice.safe ? "#4CAF50" : "#f44336",
//             }}
//           >
//             {choice.text}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     fontFamily: "Arial, sans-serif",
//     padding: "40px",
//     maxWidth: "600px",
//     margin: "0 auto",
//     textAlign: "center",
//   },
//   header: {
//     fontSize: "28px",
//     marginBottom: "20px",
//   },
//   chatBox: {
//     backgroundColor: "#f1f1f1",
//     padding: "20px",
//     borderRadius: "8px",
//     marginBottom: "20px",
//   },
//   choices: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//   },
//   button: {
//     padding: "12px",
//     border: "none",
//     borderRadius: "6px",
//     color: "#fff",
//     fontSize: "16px",
//     cursor: "pointer",
//   },
// };

// export default App;

import ChatUI from "./components/ChatUI";

function App() {
  return <ChatUI />;
}

export default App;
