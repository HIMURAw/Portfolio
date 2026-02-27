import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { EarthWrapper, EarthTitle } from "./Earth.styled";
import Starfield from "./Starfield";
import { getFresnelMat } from "./fresnelMaterial";

const EarthMesh = () => {
    const earthRef = useRef();
    const lightsRef = useRef();
    const cloudsRef = useRef();
    const glowRef = useRef();

    const [earthMap, lightsMap, cloudsMap] = useLoader(THREE.TextureLoader, [
        "/assets/earth/earthmap.jpg",
        "/assets/earth/earth_lights.png",
        "/assets/earth/cloud_combined.jpg",
    ]);

    const fresnelMat = useMemo(() => getFresnelMat(), []);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        if (earthRef.current) earthRef.current.rotation.y = elapsedTime * 0.1;
        if (lightsRef.current) lightsRef.current.rotation.y = elapsedTime * 0.1;
        if (cloudsRef.current) cloudsRef.current.rotation.y = elapsedTime * 0.15;
        if (glowRef.current) glowRef.current.rotation.y = elapsedTime * 0.1;
    });

    return (
        <group rotation={[0, 0, (-23.4 * Math.PI) / 180]} scale={[0.8, 0.8, 0.8]}>
            {/* Earth Mesh */}
            <mesh ref={earthRef}>
                <icosahedronGeometry args={[1, 14]} />
                <meshPhongMaterial map={earthMap} />
            </mesh>

            {/* Lights Mesh */}
            <mesh ref={lightsRef}>
                <icosahedronGeometry args={[1, 14]} />
                <meshBasicMaterial
                    map={lightsMap}
                    blending={THREE.AdditiveBlending}
                    transparent
                />
            </mesh>

            {/* Clouds Mesh */}
            <mesh ref={cloudsRef} scale={[1.003, 1.003, 1.003]}>
                <icosahedronGeometry args={[1, 14]} />
                <meshStandardMaterial
                    map={cloudsMap}
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Glow Mesh (Atmosphere) */}
            <mesh ref={glowRef} scale={[1.01, 1.01, 1.01]} material={fresnelMat}>
                <icosahedronGeometry args={[1, 14]} />
            </mesh>
        </group>
    );
};

export const Earth = () => {
    return (
        <EarthWrapper id="earth-page">
            <EarthTitle>World</EarthTitle>
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.1} />
                <directionalLight position={[-2.2, 0.7, 1.6]} intensity={2} />
                <EarthMesh />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </EarthWrapper>
    );
};

export default Earth;
