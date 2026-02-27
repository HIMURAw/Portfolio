import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";

const Starfield = ({ numStars = 5000 }) => {
    const starRef = useRef();
    const circleTexture = useLoader(THREE.TextureLoader, "/assets/earth/stars/circle.png");

    const [verts, colors] = useMemo(() => {
        const verts = [];
        const colors = [];

        const randomSpherePoint = () => {
            const radius = Math.random() * 25 + 25;
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            let x = radius * Math.sin(phi) * Math.cos(theta);
            let y = radius * Math.sin(phi) * Math.sin(theta);
            let z = radius * Math.cos(phi);

            return new THREE.Vector3(x, y, z);
        };

        for (let i = 0; i < numStars; i++) {
            const pos = randomSpherePoint();
            const col = new THREE.Color().setHSL(0.6, 0.4, Math.random());
            verts.push(pos.x, pos.y, pos.z);
            colors.push(col.r, col.g, col.b);
        }

        return [new Float32Array(verts), new Float32Array(colors)];
    }, [numStars]);

    useFrame((state, delta) => {
        if (starRef.current) {
            starRef.current.rotation.y -= delta * 0.02;
            starRef.current.rotation.x += delta * 0.01;
        }
    });

    return (
        <points ref={starRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={verts.length / 3}
                    array={verts}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={colors.length / 3}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                map={circleTexture}
                transparent
                alphaTest={0.5}
                opacity={0.8}
            />
        </points>
    );
};

export default Starfield;
