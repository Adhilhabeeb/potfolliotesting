// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// // Paste your base64 image data here
// const base64_imgData = 'data:image/png;base64,...'; // <-- replace with actual base64 image

// const ThreeSphere = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     let scene, camera, renderer, controls, mesh;
//     let geometry;
//     const mount = mountRef.current;

//     const img = document.createElement("img");
//     img.crossOrigin = "Anonymous";
//     img.src = base64_imgData;

//     const position2Dir = (position) => {
//       const vector = new THREE.Vector3(position.x, position.y, position.z);
//       const length = vector.length();

//       const hd = Math.sqrt(position.x ** 2 + position.z ** 2) / length;
//       let h = Math.atan(position.y / length / hd) / Math.PI * 180 * -1;

//       let az = Math.atan(position.z / hd / (position.x / hd));
//       if (position.x < 0 && position.z > 0) az += Math.PI;
//       if (position.x < 0 && position.z < 0) az += Math.PI;
//       if (position.x > 0 && position.z < 0) az += Math.PI * 2;

//       az = (az / Math.PI) * 180;
//       if (isNaN(az)) az = 0;

//       return { az, h };
//     };

//     const getH = (dir, canvas) => {
//       dir.az = (360 - dir.az + 180) % 360;
//       const x = Math.floor((canvas.width * dir.az) / 360);
//       const y = Math.floor((canvas.height * (dir.h + 90)) / 180);
//       const ctx = canvas.getContext("2d");
//       const pixelData = ctx.getImageData(x, y, 1, 1).data;
//       return 200 + pixelData[0] / 5;
//     };

//     const init = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
//       camera.position.z = 500;
//       scene.add(camera);

//       renderer = new THREE.WebGLRenderer({ antialias: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       mount.appendChild(renderer.domElement);

//       controls = new OrbitControls(camera, renderer.domElement);

//       geometry = new THREE.SphereGeometry(200, 256, 128);
//       const texture = new THREE.Texture();
//       texture.image = img;

//       const material = new THREE.MeshBasicMaterial({
//         map: texture,
//         side: THREE.DoubleSide
//       });

//       mesh = new THREE.Mesh(geometry, material);
//       scene.add(mesh);
//     };

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     img.onload = () => {
//       const texture = new THREE.Texture(img);
//       texture.needsUpdate = true;

//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, img.width, img.height);

//       for (let i = 0; i < geometry.vertices.length; i++) {
//         const dir = position2Dir(geometry.vertices[i]);
//         const h = getH(dir, canvas);
//         const vector = new THREE.Vector3().copy(geometry.vertices[i]).setLength(h);
//         geometry.vertices[i].copy(vector);
//       }

//       geometry.verticesNeedUpdate = true;
//     };

//     init();
//     animate();

//     return () => {
//       mount.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
// };

// export default ThreeSphere;
// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// // Paste your base64 image data here
// const base64_imgData = 'data:image/png;base64,...'; // <-- replace with actual base64 image

// const ThreeSphere = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     let scene, camera, renderer, controls, mesh;
//     let geometry;
//     const mount = mountRef.current;

//     const img = document.createElement("img");
//     img.crossOrigin = "Anonymous";
//     img.src = base64_imgData;

//     const position2Dir = (position) => {
//       const vector = new THREE.Vector3(position.x, position.y, position.z);
//       const length = vector.length();

//       const hd = Math.sqrt(position.x ** 2 + position.z ** 2) / length;
//       let h = Math.atan(position.y / length / hd) / Math.PI * 180 * -1;

//       let az = Math.atan(position.z / hd / (position.x / hd));
//       if (position.x < 0 && position.z > 0) az += Math.PI;
//       if (position.x < 0 && position.z < 0) az += Math.PI;
//       if (position.x > 0 && position.z < 0) az += Math.PI * 2;

//       az = (az / Math.PI) * 180;
//       if (isNaN(az)) az = 0;

//       return { az, h };
//     };

//     const getH = (dir, canvas) => {
//       dir.az = (360 - dir.az + 180) % 360;
//       const x = Math.floor((canvas.width * dir.az) / 360);
//       const y = Math.floor((canvas.height * (dir.h + 90)) / 180);
//       const ctx = canvas.getContext("2d");
//       const pixelData = ctx.getImageData(x, y, 1, 1).data;
//       return 200 + pixelData[0] / 5;
//     };

//     const init = () => {
//       scene = new THREE.Scene();
//       camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
//       camera.position.z = 500;
//       scene.add(camera);

//       renderer = new THREE.WebGLRenderer({ antialias: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       mount.appendChild(renderer.domElement);

//       controls = new OrbitControls(camera, renderer.domElement);

//       geometry = new THREE.SphereGeometry(200, 256, 128);
//       const texture = new THREE.Texture();
//       texture.image = img;

//       const material = new THREE.MeshBasicMaterial({
//         map: texture,
//         side: THREE.DoubleSide
//       });

//       mesh = new THREE.Mesh(geometry, material);
//       scene.add(mesh);
//     };

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     img.onload = () => {
//       const texture = new THREE.Texture(img);
//       texture.needsUpdate = true;

//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, img.width, img.height);

//       for (let i = 0; i < geometry.vertices.length; i++) {
//         const dir = position2Dir(geometry.vertices[i]);
//         const h = getH(dir, canvas);
//         const vector = new THREE.Vector3().copy(geometry.vertices[i]).setLength(h);
//         geometry.vertices[i].copy(vector);
//       }

//       geometry.verticesNeedUpdate = true;
//     };

//     init();
//     animate();

//     return () => {
//       mount.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
// };

// export default ThreeSphere;
