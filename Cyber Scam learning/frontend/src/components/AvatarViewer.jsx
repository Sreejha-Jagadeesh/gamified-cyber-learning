import React from "react";
import { useGLTF } from "@react-three/drei";

const AvatarViewer = () => {
  const { scene } = useGLTF("/avatar.glb");
  return <primitive object={scene} scale={5} position={[0, -7, 0]} />
  // Increased from 1.5 to 2.5
  ;
};

export default AvatarViewer;
