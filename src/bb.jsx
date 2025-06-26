
import heightmap from "./../public/heightmap.png"

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const HeightMapTerrain = () => {
  const mountRef = useRef();

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 30, 60);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);
    controls.update();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(30, 50, 30);
    scene.add(ambientLight, directionalLight);

    // Load heightmap
    const loader = new THREE.TextureLoader();
    loader.load(heightmap, (texture) => {
      const image = texture.image;

      const canvas = document.createElement("canvas");
      const size = 256;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, size, size);
      const imgData = ctx.getImageData(0, 0, size, size).data;

      const geometry = new THREE.PlaneGeometry(50, 50, size - 1, size - 1);
      geometry.rotateX(-Math.PI / 2);

      const vertices = geometry.attributes.position;
      const colors = [];

      for (let i = 0; i < vertices.count; i++) {

        const x = i % size;
        const y = Math.floor(i / size);
        console.log(i,size,Math.floor(i/size),"iio",i%size)

        const pixelIndex = (y * size + x) * 4;
        const r = imgData[pixelIndex];
        const heightValue = r / 255;

        vertices.setY(i, heightValue * 10);

        if (heightValue > 0.6) {
          colors.push(0.1, 0.6, 0.1); // green
        } else {
          colors.push(1.0, 1.0, 0.0); // yellow
        }
      }

      geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // update orbit controls
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default HeightMapTerrain;
