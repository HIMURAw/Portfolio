import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Html } from "@react-three/drei";
import { EarthWrapper, EarthTitle } from "./Earth.styled";
import Starfield from "./Starfield";
import { getFresnelMat } from "./fresnelMaterial";
import { useScreenWidth } from "../../hooks/useScreenWidth";

// Lat/lon → 3D nokta (birim küre üzerinde)
function latLonToVec3(lat, lon, radius = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

// Türkiye / Ankara koordinatları
const TURKEY_LAT = 39.9;
const TURKEY_LON = -147.8;

const LocationMarker = ({ isMobile }) => {
    const tipRadius = isMobile ? 1.35 : 1.5;
    const photoSize = isMobile ? 64 : 96;

    // Küre yüzeyindeki nokta (çizgi başlangıcı)x
    const surfacePoint = useMemo(
        () => latLonToVec3(TURKEY_LAT, TURKEY_LON, 1.01),
        []
    );

    // Html elemanının 3D konumu (çizgi ucu)
    const tipPoint = useMemo(
        () => latLonToVec3(TURKEY_LAT, TURKEY_LON, tipRadius),
        [tipRadius]
    );

    // Çizgi geometrisi
    const lineGeometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints([surfacePoint, tipPoint]);
    }, [surfacePoint, tipPoint]);

    return (
        <group>
            {/* Yüzeyde parlayan nokta */}
            <mesh position={surfacePoint.toArray()}>
                <sphereGeometry args={[isMobile ? 0.009 : 0.012, 16, 16]} />
                <meshBasicMaterial color="#00d4ff" />
            </mesh>

            {/* Radyal çizgi */}
            <line geometry={lineGeometry}>
                <lineBasicMaterial color="#00d4ff" linewidth={1} />
            </line>

            {/* 2D HTML overlay — profil fotoğrafı */}
            <Html
                position={tipPoint.toArray()}
                center
                zIndexRange={[0, 0]}
                style={{ pointerEvents: "none" }}
            >
                <div
                    style={{
                        width: photoSize,
                        height: photoSize,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "1.5px solid #00d4ff",
                        boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
                        flexShrink: 0,
                    }}
                >
                    <img
                        src="/profil.jpeg"
                        alt="profil"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                        }}
                    />
                </div>
            </Html>
        </group>
    );
};

const EarthMesh = ({ isMobile }) => {
    const earthRef = useRef();
    const lightsRef = useRef();
    const cloudsRef = useRef();
    const glowRef = useRef();
    const markerGroupRef = useRef();

    const [earthMap, lightsMap, cloudsMap] = useLoader(THREE.TextureLoader, [
        "/assets/earth/earthmap.jpg",
        "/assets/earth/earth_lights.png",
        "/assets/earth/cloud_combined.jpg",
    ]);

    const fresnelMat = useMemo(() => getFresnelMat(), []);

    // Mobilde küre biraz daha küçük, kameraya daha yakın his verir
    const globeScale = isMobile ? 0.58 : 0.8;

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const rotY = elapsedTime * 0.1;

        if (earthRef.current) earthRef.current.rotation.y = rotY;
        if (lightsRef.current) lightsRef.current.rotation.y = rotY;
        if (cloudsRef.current) cloudsRef.current.rotation.y = elapsedTime * 0.15;
        if (glowRef.current) glowRef.current.rotation.y = rotY;
        if (markerGroupRef.current) markerGroupRef.current.rotation.y = rotY;
    });

    return (
        <group
            rotation={[0, 0, (-23.4 * Math.PI) / 180]}
            scale={[globeScale, globeScale, globeScale]}
        >
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

            {/* Türkiye Marker */}
            <group ref={markerGroupRef}>
                <LocationMarker isMobile={isMobile} />
            </group>
        </group>
    );
};

export const Earth = () => {
    const { width } = useScreenWidth();
    const isMobile = width <= 768;

    return (
        <EarthWrapper id="earth-page">
            <EarthTitle>World</EarthTitle>
            <Canvas
                camera={{
                    position: [0, 0, isMobile ? 3.5 : 3],
                    fov: isMobile ? 50 : 45,
                }}
                gl={{ alpha: true }}
            >
                <ambientLight intensity={0.1} />
                <directionalLight position={[-2.2, 0.7, 1.6]} intensity={2} />
                <EarthMesh isMobile={isMobile} />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </EarthWrapper>
    );
};

export default Earth;
