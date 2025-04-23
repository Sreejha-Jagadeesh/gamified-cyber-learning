// import { useEffect, useState } from "react";
// import "./SelfDefense.css";

// export default function SelfDefense() {
//   const videoLinks = [
//     "https://www.youtube.com/watch?v=M4_8PoRQP8w",
//     "https://www.youtube.com/watch?v=k9Jn0eP-ZVg",
//     "https://www.youtube.com/watch?v=-V4vEyhWDZ0",
//     "https://www.youtube.com/watch?v=pndPbpHLpos",
//     "https://www.youtube.com/watch?v=EmKOOZIropE",
//     "https://www.youtube.com/watch?v=T7aNSRoDCmg",
//     "https://www.youtube.com/watch?v=wb2oh2skrHA",
//   ];

//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const getRandomVideos = () => {
//       const shuffled = videoLinks.sort(() => 0.5 - Math.random());
//       return shuffled.slice(0, 2);
//     };
//     setVideos(getRandomVideos());
//   }, []);

//   return (
//     <div className="main-container">
//       <div className="container">
//         <h1>Self Defense Resources</h1>

//         {/* Videos Side by Side */}
//         <div className="video-section">
//           {videos.map((url, index) => (
//             <iframe
//               key={index}
//               src={url.replace("watch?v=", "embed/")}
//               title={`Self Defense Video ${index + 1}`}
//               frameBorder="0"
//               allowFullScreen
//               width="500"
//               height="300"
//             ></iframe>
//           ))}
//         </div>

//         {/* Images Side by Side */}
//         <div className="images-section">
//           <img
//             src="https://www.shutterstock.com/image-vector/self-defense-flat-set-isolated-260nw-1611237346.jpg"
//             alt="Self Defense Image 1"
//           />
//           <img
//             src="https://media.istockphoto.com/id/150379293/vector/female-self-defense.jpg?s=612x612&w=0&k=20&c=b0iIuxnPMZHMGU924v67LSqcpXHmtlZHdYm77oNZqCI="
//             alt="Self Defense Image 2"
//           />
//         </div>

//         {/* PDF Download */}
//         <div className="pdf-section">
//           <a href="/pdfs/pdf_1.pdf" download>
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
//               alt="Download PDF"
//               className="pdf-icon"
//             />
//             <p>Download Self Defense Guide (PDF)</p>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import "./SelfDefense.css";

export default function SelfDefense() {
  const videoLinks = [
    "https://www.youtube.com/watch?v=M4_8PoRQP8w",
    "https://www.youtube.com/watch?v=k9Jn0eP-ZVg",
    "https://www.youtube.com/watch?v=-V4vEyhWDZ0",
    "https://www.youtube.com/watch?v=pndPbpHLpos",
    "https://www.youtube.com/watch?v=EmKOOZIropE",
    "https://www.youtube.com/watch?v=T7aNSRoDCmg",
    "https://www.youtube.com/watch?v=wb2oh2skrHA",
  ];

  const [video, setVideo] = useState("");

  useEffect(() => {
    const getRandomVideo = () => {
      const shuffled = videoLinks.sort(() => 0.5 - Math.random());
      return shuffled[0]; // Select one random video
    };
    setVideo(getRandomVideo());
  }, []);

  return (
    <div className="main-container">
      <div className="container">
        <h1>Self Defense Resources</h1>

        {/* Video & Spotify Side by Side */}
        <div className="video-section">
          <iframe
            src={video.replace("watch?v=", "embed/")}
            title="Self Defense Video"
            frameBorder="0"
            allowFullScreen
            width="500"
            height="300"
          ></iframe>

          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/album/3OUj9ygj2KRcnKY1a1daGt?utm_source=generator"
            width="500"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        {/* Images Side by Side */}
        <div className="images-section">
          <img
            src="https://www.shutterstock.com/image-vector/self-defense-flat-set-isolated-260nw-1611237346.jpg"
            alt="Self Defense Image 1"
          />
          <img
            src="https://media.istockphoto.com/id/150379293/vector/female-self-defense.jpg?s=612x612&w=0&k=20&c=b0iIuxnPMZHMGU924v67LSqcpXHmtlZHdYm77oNZqCI="
            alt="Self Defense Image 2"
          />
        </div>

        {/* PDF Download */}
        <div className="pdf-section">
          <a href="/pdfs/pdf_1.pdf" download>
            <img
              src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
              alt="Download PDF"
              className="pdf-icon"
            />
            <p>Download Self Defense Guide (PDF)</p>
          </a>
        </div>
      </div>
    </div>
  );
}
