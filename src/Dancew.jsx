import { useEffect, useRef } from "react";
import * as THREE from "three";
import hh from "../public/bb.png"
const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Setup scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(hh, (texture) => {
      // Create large plane geometry (2,2) divided into 40x40
      const largeGeometry = new THREE.PlaneGeometry(2, 2, 40, 40);
      const largeMaterial = new THREE.MeshBasicMaterial({ color:"red", side: THREE.DoubleSide });
      const largePlane = new THREE.Mesh(largeGeometry, largeMaterial);
      scene.add(largePlane);

      // Extract vertex positions & UVs
      const positionAttribute = largeGeometry.getAttribute("position");

    
      const uvAttribute = largeGeometry.getAttribute("uv");
      const smallPlaneSize = 0.05; // Size of each small plane

      for (let i = 0; i < positionAttribute.count; i++) {
        // Get vertex position & UV
        
        const pos = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
        const uv = new THREE.Vector2().fromBufferAttribute(uvAttribute, i);

        // Create small plane geometry
        const smallGeometry = new THREE.PlaneGeometry(smallPlaneSize, smallPlaneSize);

        // Apply correct UV mapping
        smallGeometry.setAttribute(
          "uv",
          new THREE.Float32BufferAttribute([
            uv.x, uv.y, 
            uv.x + 0.01, uv.y, 
            uv.x, uv.y + 0.01, 
            uv.x + 0.01, uv.y + 0.01
          ], 2)
        );

        // Create material with texture
        const smallMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide,transparent:true });



        console.log(pos)
        // Create and position small plane
        const smallPlane = new THREE.Mesh(smallGeometry, smallMaterial);
        smallPlane.position.copy(new THREE.Vector3(pos.x,pos.y,pos.z));
        scene.add(smallPlane);
      }

      // Set camera position
      camera.position.z = 3;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    });

    // Cleanup
   
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
