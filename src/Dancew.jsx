import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as BufferGeometryUtils from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/utils/BufferGeometryUtils.js";
import heightmap from "./../public/water.png";
import verttyre from "./shader/vert.glsl"
import fragtyre from "./shader/frag.glsl"
import { Sky } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import grassTextureImg from "../public/grass1.webp";
import InitRapier, { addPhysics, trest } from "./physics/initRapier";
import { GRAVITY } from "./physics/Constants";
import Stats from 'three/examples/jsm/libs/stats.module'
  let RAPIER,physicsWorld,physicsObjects


     RAPIER = await InitRapier()

     console.log(RAPIER,"is8976586758967")
  physicsWorld = new RAPIER.World(GRAVITY)
  physicsObjects = [] // initializing physics objects array


const DancingGrass =  () => {
  const canvasRef = useRef(null);
  const [adttar, setadttar] = useState([]);
  let aarr = useRef();
  const size = 256;

  useEffect( () => {
const stats = Stats()
document.body.appendChild(stats.dom)
    ///PHYSICS


trest()




    ///
      const raycastertyre = new THREE.Raycaster();
    // Scene Setup
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // A plane facing the camera at z = 0
    const intersectionPoint = new THREE.Vector3();
    const grassTexture = new THREE.TextureLoader().load(grassTextureImg);
    const cloudTexture = new THREE.TextureLoader().load("../public/adhil.jpeg");
    cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
    let raycaster = new THREE.Raycaster();
    window.addEventListener("mousemove", onMouseMove);

    let mouse = new THREE.Vector3();

    let arrgrass = [];
    let adtt = [];
    const scene = new THREE.Scene();
    let sky,sun;

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const geom = new THREE.BufferGeometry();

    // Parameters
    const PLANE_SIZE =20;

    // console.log(   (Math.round(Math.PI * PLANE_SIZE) * Math.PI) / 2.5 ,"pllll")
    let pano = new THREE.PlaneGeometry(
      PLANE_SIZE,
      PLANE_SIZE,
      size - 1,
      size - 1
    );

    //   function addInteractiveGeometry(scene,uniforms) {
    //     let g = new THREE.IcosahedronGeometry(4, 20);
    //     g = BufferGeometryUtils.mergeVertices(g);

    //     let material = new THREE.ShaderMaterial({
    //         uniforms: {
    //             mousePosition: { value: uniforms.mousePos }
    //         },
    //         vertexShader: `
    //         void main() {
    //             float lerp(float a, float b, float amount) {
    //                 return a + (b - a) * amount;
    //             }

    //             vec3 p = position;
    //             float dist = min(distance(p, mousePosition), 1.);
    //             float lerpFactor = .2;
    //             p.x = lerp(p.x, position.x * dist, lerpFactor);
    //             p.y = lerp(p.y, position.y * dist, lerpFactor);
    //             p.z = lerp(p.z, position.z * dist, lerpFactor);

    //             vec4 mvPosition = modelViewMatrix * vec4(p, 1.);
    //             gl_Position = projectionMatrix * mvPosition;
    //         }
    //         `,
    //         fragmentShader: `
    //         void main() {
    //             gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //         }
    //         `
    //     });

    //     let points = new THREE.Mesh(g, material);
    //     scene.add(points);

    //     return { points, uniforms };
    // }

    let particleMaterial = new THREE.ShaderMaterial({
      vertexShader: `
          varying vec2 vUv;
          varying float vDist;
           uniform vec3 uMousePosition;
          void main() {

           vec3 seg = position - uMousePosition;
    float dist = length(seg);
    float force = clamp(1.0 / (dist * dist), 0.0, 1.0);
    vec3 newPosition = position + normalize(seg) * force;
vDist=dist;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
              vUv = uv;
              // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
      `,
      fragmentShader: `
         varying float vDist;

  void main() {
    vec3 color;
    float alpha;
    
    if (vDist < 2.0) {
      color = vec3(1.0, 0.0, 1.0); // Magenta color for particles influenced by the marker
      alpha = 1.0;
    } else {
      color = vec3(0.0, 1.0, 1.0); // Cyan color for particles not influenced by the marker
      alpha = 1.0;
    }
    
    gl_FragColor = vec4(color, alpha);
  }      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMousePosition: { value: new THREE.Vector3() },
        textures: { value: [grassTexture, cloudTexture] },
      },
    });
    let cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1),
      new THREE.MeshBasicMaterial({ color: "yellow" })
    );
    let cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1),
      new THREE.MeshBasicMaterial({ color: "blue" })
    );
    cube2.position.x = 3;
    cube2.position.y = 2;
cube1.position.y=0.3
    scene.add(cube1, cube2);
    let unifopm = {
      mousePos: particleMaterial.uniforms.uMousePosition,
    };
    // addInteractiveGeometry(scene,unifopm)

    const BLADE_COUNT = pano.attributes.position.count;
    const BLADE_WIDTH = 0.1;
    let BLADE_HEIGHT = 0.8;
    const BLADE_HEIGHT_VARIATION = 0.6;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
function initSky() {

				// Add Sky
				sky = new Sky();
				sky.scale.setScalar( 450000 );
				scene.add( sky );

				sun = new THREE.Vector3();

				/// GUI

				const effectController = {
					turbidity: 10,
					rayleigh: 3,
					mieCoefficient: 0.005,
					mieDirectionalG: 0.7,
					elevation: 2,
					azimuth: 180,
					exposure: renderer.toneMappingExposure
				};
        const uniforms = sky.material.uniforms;
        const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
					const theta = THREE.MathUtils.degToRad( effectController.azimuth );

					sun.setFromSphericalCoords( 1, phi, theta );

					uniforms[ 'sunPosition' ].value.copy( sun );

					renderer.toneMappingExposure = effectController.exposure;
					renderer.render( scene, camera );
      }
      initSky()
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enablePan = false;
    // controls.enableZoom = true;
    // controls.minPolarAngle = 1.1;
    // // controls.maxPolarAngle = 1.45;
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.1;
    // controls.target.set(0, 0, 0);

    // Camera
    camera.position.set(-7, 7, 15);
    // camera.lookAt(controls.target);
    // camera.setFocalLength(15);

    // Grass Texture

    // Time Uniform
    const startTime = Date.now();
    const timeUniform = { type: "f", value: 0.0 };

    // Grass Shader
    const grassUniforms = {
      textures: { value: [grassTexture, cloudTexture] },
      iTime: timeUniform,
    };

    const grassMaterial = new THREE.ShaderMaterial({
      uniforms: grassUniforms,
      vertexShader: ` varying vec2 vUv;
    varying vec2 cloudUV;
    
    varying vec3 vColor;
    uniform float iTime;
    
    void main() {
      vUv = uv;
      cloudUV = uv;
      vColor = color;
      vec3 cpos = position;
    
      float waveSize = 10.0f;
      float tipDistance = 0.3f;
      float centerDistance = 0.1f;
    
      if (color.x >0.6f) {
        cpos.x += sin((iTime / 500.) + (uv.x * waveSize)) * tipDistance;
          
      }else if (color.x > 0.0f) {
        cpos.x += sin((iTime / 500.) + (uv.x * waveSize)) * centerDistance;
      }
    
      // float diff = position.x - cpos.x;
      // cloudUV.x += iTime / 20000.;
      // // cloudUV.y += iTime / 10000.;
    
      vec4 worldPosition = vec4(cpos, 1.);
      vec4 mvPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      gl_Position = mvPosition;
    }`,
      fragmentShader: ` uniform sampler2D texture1;
    uniform sampler2D textures[4];
    
    varying vec2 vUv;
    varying vec2 cloudUV;
    varying vec3 vColor;
    
    void main() {
      float contrast = 1.5;
      float brightness = 0.1;
      vec3 color = texture2D(textures[0], vUv).rgb * contrast;
      // color = color + vec3(brightness, brightness, brightness);
      color = mix(color, texture2D(textures[1], vUv).rgb, 0.5);
      gl_FragColor.rgb = color;
      gl_FragColor.a = 1.;
    }`,

      vertexColors: true,
      side: THREE.DoubleSide,
    });

    
    
    let marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 8),
      new THREE.MeshBasicMaterial({ color: "red", wireframe: true })
    );
    // scene.add(marker);
    generateField();
    let clock = new THREE.Clock();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function convertRange(val, oldMin, oldMax, newMin, newMax) {
      return ((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
    }

    // function generateField() {
    //   const positions = [];
    //   const uvs = [];
    //   const indices = [];
    //   const colors = [];
    //   const positionAttribute = pano.getAttribute("position");

    //   const uvAttribute = pano.getAttribute("uv");
    //   let vertices = pano.attributes.position;
    //   for (let i = 0; i < BLADE_COUNT; i++) {
    //     const xpl = vertices.getX(i);

    //     const ypl = vertices.getY(i);
    //     const zpl = vertices.getZ(i);
    //     const randomX = xpl + (Math.random() - 0.5) * 0.1;
    //     const randomY = ypl + (Math.random() - 0.5) * 0.1;
    //     const randomZ = zpl + (Math.random() - 0.5) * 0.1;

    //     // const particle = new THREE.Points(new THREE.SphereGeometry(0.06), new THREE.PointsMaterial());

    //     //             particle.position.set(randomX, randomY, randomZ);

    //     const VERTEX_COUNT = 5;
    //     const surfaceMin = PLANE_SIZE / 2;
    //     const surfaceMax = (PLANE_SIZE / 2) * -1;
    //     const radius = pano.attributes.position.count;
    //     const r = radius * Math.sqrt(Math.random());
    //     const theta = Math.random() * 2 * Math.PI;
    //     const x = r * Math.cos(theta);
    //     const y = r * Math.sin(theta);

    //     const pos = new THREE.Vector3(randomX, 0, randomY);

    //     const uv = [
    //       convertRange(pos.x, surfaceMin, surfaceMax, 0, 1),
    //       convertRange(pos.z, surfaceMin, surfaceMax, 0, 1)
    //     ];

    //     const blade = generateBlade(pos, i * VERTEX_COUNT, uv);
    //     blade.verts.forEach((vert) => {
    //       positions.push(...vert.pos);
    //       uvs.push(...vert.uv);
    //       colors.push(...vert.color);
    //     });
    //     blade.indices.forEach((indice) => indices.push(indice));
    //   }

    //   geom.setAttribute(
    //     "position",
    //     new THREE.BufferAttribute(new Float32Array(positions), 3)
    //   );
    //   geom.setAttribute(
    //     "uv",
    //     new THREE.BufferAttribute(new Float32Array(uvs), 2)
    //   );
    //   geom.setAttribute(
    //     "color",
    //     new THREE.BufferAttribute(new Float32Array(colors), 3)
    //   );
    //   geom.setIndex(indices);
    //   let plka = new THREE.PlaneGeometry(2, 2);
    //   // geom.computeVertexNormals();
    //   // geom.computeFaceNormals();

    //   const mesh = new THREE.Mesh(geom, grassMaterial);

    //   scene.add(mesh);

    //   // glassgrid(positions,uvs,colors)

    // }

    const indices = [];

    let grassmesh;
    function generateField() {
      let dvcolor = [];
      const positions = [];
      const uvs = [];
      const colors = [];
      const positionAttribute = pano.getAttribute("position");

      const uvAttribute = pano.getAttribute("uv");
      let vertices = pano.attributes.position;

      const loader = new THREE.TextureLoader();

      loader.load(heightmap, (texture) => {
        const image = texture.image;

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, size, size);
        const imgData = ctx.getImageData(0, 0, size, size).data;

        // const geometry = new THREE.PlaneGeometry(50, 50, size - 1, size - 1);
        // geometry.rotateX(-Math.PI / 2);

        // for (let i = 0; i < vertices.count; i++) {

        //   const x = i % size;
        //   const y = Math.floor(i / size);
        //   console.log(i,size,Math.floor(i/size),"iio",i%size)

        //   const pixelIndex = (y * size + x) * 4;
        //   const r = imgData[pixelIndex];
        //   const heightValue = r / 255;

        //   vertices.setY(i, heightValue * 10);

        //   if (heightValue > 0.6) {
        //     colors.push(0.1, 0.6, 0.1); // green
        //   } else {
        //     colors.push(1.0, 1.0, 0.0); // yellow
        //   }
        // }

        // geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

        // const material = new THREE.MeshStandardMaterial({
        //   vertexColors: true,
        //   flatShading: true,
        // });

        // const mesh = new THREE.Mesh(geometry, material);
        // scene.add(mesh);

        for (let i = 0; i < BLADE_COUNT; i++) {
          function callikg(params) {
            const x = i % size;
            const y = Math.floor(i / size);
            // console.log(i,size,Math.floor(i/size),"iio",i%size)

            const pixelIndex = (y * size + x) * 4;
            const r = imgData[pixelIndex];
            const heightValue = r / 255;

            // vertices.setY(i, heightValue * 10);

            return heightValue;
          }
          let heightValue = callikg();

          if (heightValue > 0.6) {
            // console.log("green",heightValue)

            BLADE_HEIGHT = 0.8;

            const xpl = vertices.getX(i);

            const ypl = vertices.getY(i);
            const zpl = vertices.getZ(i);
            const randomX = xpl + (Math.random() - 0.5) * 0.1;
            const randomY = ypl + (Math.random() - 0.5) * 0.1;
            const randomZ = zpl + (Math.random() - 0.5) * 0.1;
            //
            // const particle = new THREE.Points(new THREE.SphereGeometry(0.06), new THREE.PointsMaterial());

            //             particle.position.set(randomX, randomY, randomZ);

            const VERTEX_COUNT = 5;
            const surfaceMin = PLANE_SIZE / 2;
            const surfaceMax = (PLANE_SIZE / 2) * -1;
            const radius = pano.attributes.position.count;
            const r = radius * Math.sqrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const x = r * Math.cos(theta);
            const y = r * Math.sin(theta);

            const pos = new THREE.Vector3(randomX, 0, randomY);
            // console.log(pos)
            const uv = [
              convertRange(pos.x, surfaceMin, surfaceMax, 0, 1),
              convertRange(pos.z, surfaceMin, surfaceMax, 0, 1),
            ];

            const blade = generateBlade(pos, i * VERTEX_COUNT, uv);
            blade.visible = true;
            blade.verts.forEach((vert) => {
              positions.push(...vert.pos);
              uvs.push(...vert.uv);
              colors.push(...vert.color);
            });

            ///
            const localPos = new THREE.Vector3(xpl, ypl, zpl);
            blade.localPos = localPos;
            //
            blade.id = i;

        blade.indices.forEach((indice) => indices.push(indice));
        blade.visible = false;
      
            checkblade(blade);
            // console.log("is vosisi", blade.id);

            arrgrass.push(blade);
            vertices.setY(i, heightValue * 100);
          } else {
            BLADE_HEIGHT = 0.7;

            const xpl = vertices.getX(i);

            const ypl = vertices.getY(i);
            const zpl = vertices.getZ(i);
            const randomX = xpl + (Math.random() - 0.5) * 0.1;
            const randomY = ypl + (Math.random() - 0.5) * 0.1;
            const randomZ = zpl + (Math.random() - 0.5) * 0.1;

            // const particle = new THREE.Points(new THREE.SphereGeometry(0.06), new THREE.PointsMaterial());

            //             particle.position.set(randomX, randomY, randomZ);

            const VERTEX_COUNT = 5;
            const surfaceMin = PLANE_SIZE / 2;
            const surfaceMax = (PLANE_SIZE / 2) * -1;
            const radius = pano.attributes.position.count;
            const r = radius * Math.sqrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const x = r * Math.cos(theta);
            const y = r * Math.sin(theta);

            const pos = new THREE.Vector3(randomX, 0, randomY);
            // console.log(pos)
            const uv = [
              convertRange(pos.x, surfaceMin, surfaceMax, 0, 1),
              convertRange(pos.z, surfaceMin, surfaceMax, 0, 1),
            ];

            const blade = generateBlade(pos, i * VERTEX_COUNT, uv);

            // console.log(blade.pos)

            blade.visible = true;
            blade.verts.forEach((vert) => {
              positions.push(...vert.pos);
              uvs.push(...vert.uv);
              colors.push(...vert.color);
            });

            ///
            blade.id = i;
            // console.log(blade.id);
            const localPos = new THREE.Vector3(xpl, ypl, zpl);
            blade.localPos = localPos;
            //

            checkblade(blade);
            // console.log("is vosisi",blade.visible)

        blade.indices.forEach((indice) => indices.push(indice));
        blade.visible = false;
   
            arrgrass.push(blade);

            // console.log("yellow",heightValue)
          }

          // vertices.setY(i, heightValue * 100);
        }

        geom.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array(positions), 3)
        );
        geom.setAttribute(
          "uv",
          new THREE.BufferAttribute(new Float32Array(uvs), 2)
        );

        geom.setAttribute(
          "color",
          new THREE.BufferAttribute(new Float32Array(colors), 3)
        );
      
        geom.setIndex(indices);
        let plka = new THREE.PlaneGeometry(2, 2);
        // geom.computeVertexNormals();
        // geom.computeFaceNormals();

        grassmesh = new THREE.InstancedMesh(geom, grassMaterial,10);
        let scalesi=20
grassmesh.scale.multiplyScalar(9)
console.log(grassmesh.scale)
        grassmesh.name = "grass";

        scene.add(grassmesh);
      });

      // glassgrid(positions,uvs,colors)
    }

    function checkblade(blade) {
     
    }
    function glassgrid(positions, uvs, colors) {
      let add = [];

      const positionAttribute = pano.getAttribute("position");

      const uvAttribute = pano.getAttribute("uv");
      const smallPlaneSize = 0.09; // Size of each small plane

      let coil = geom.getAttribute("color").array;

      for (let i = 0; i < positionAttribute.count; i++) {
        // console.log(coil,"fgf")
        const smallGeometry = new THREE.PlaneGeometry(
          smallPlaneSize,
          smallPlaneSize
        );

        const pos = new THREE.Vector3().fromBufferAttribute(
          positionAttribute,
          i
        );
        const uv = new THREE.Vector2().fromBufferAttribute(uvAttribute, i);

        smallGeometry.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(
            [uv.x, uv.y, uv.x, uv.y, uv.x, uv.y, uv.x, uv.y],
            2
          )
        );

        // // Apply correct UV mapping
        smallGeometry.setAttribute(
          "uv",
          new THREE.Float32BufferAttribute(
            [uv.x, uv.y, uv.x, uv.y, uv.x, uv.y, uv.x, uv.y],
            2
          )
        );

        const smallMaterial = new THREE.MeshBasicMaterial({
          map: grassTexture,
          side: THREE.DoubleSide,
        });

        // console.log(pos)
        // Create and position small plane
        const smallPlane = new THREE.Mesh(smallGeometry, smallMaterial);
        smallPlane.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z));

        adtt.push(smallPlane);
      }
    }

    if (adtt.length >= pano.attributes.position.count - 3) {
      let grp = new THREE.Group();
      aarr.current = adtt;

      adtt.forEach((e) => {
        grp.add(e);
      });

      scene.add(grp);
    }

    function generateBlade(center, vArrOffset, uv) {
      const MID_WIDTH = BLADE_WIDTH * 0.5;
      const TIP_OFFSET = 0.1;
      const height = BLADE_HEIGHT;

      const yaw = Math.random() * Math.PI * 2;
      const yawUnitVec = new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw));
      const tipBend = Math.random() * Math.PI * 2;
      const tipBendUnitVec = new THREE.Vector3(
        Math.sin(tipBend),
        0,
        -Math.cos(tipBend)
      );

      // Find the Bottom Left, Bottom Right, Top Left, Top right, Top Center vertex positions
      const bl = new THREE.Vector3().addVectors(
        center,
        new THREE.Vector3()
          .copy(yawUnitVec)
          .multiplyScalar((BLADE_WIDTH / 2) * 1)
      );
      const br = new THREE.Vector3().addVectors(
        center,
        new THREE.Vector3()
          .copy(yawUnitVec)
          .multiplyScalar((BLADE_WIDTH / 2) * -1)
      );
      const tl = new THREE.Vector3().addVectors(
        center,
        new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * 1)
      );
      const tr = new THREE.Vector3().addVectors(
        center,
        new THREE.Vector3()
          .copy(yawUnitVec)
          .multiplyScalar((MID_WIDTH / 2) * -1)
      );
      const tc = new THREE.Vector3().addVectors(
        center,
        new THREE.Vector3().copy(tipBendUnitVec).multiplyScalar(TIP_OFFSET)
      );

      tl.y += height / 2;
      tr.y += height / 2;
      tc.y += height;

      // Vertex Colors
      const black = [0.0, 0.0, 0.0];
      const gray = [0.5, 0.0, 0.0];
      const white = [1.0, 1.0, 1.0];

      const verts = [
        { pos: bl, uv: uv, color: black },
        { pos: br, uv: uv, color: black },
        { pos: tr, uv: uv, color: gray },
        { pos: tl, uv: uv, color: gray },
        { pos: tc, uv: uv, color: white },
      ];

      const indices = [
        vArrOffset,
        vArrOffset + 1,
        vArrOffset + 2,
        vArrOffset + 2,
        vArrOffset + 4,
        vArrOffset + 3,
        vArrOffset + 3,
        vArrOffset,
        vArrOffset + 2,
      ];

      return { verts, indices };
    }

    function onMouseMove(event) {
      if (adtt.length >= pano.attributes.position.count - 3) {
        let intersects = raycaster.intersectObjects(adtt);

        for (let index = 0; index < intersects.length; index++) {
          // console.log(intersects[index],"ius the mesh",intersects)
          let point = intersects[index];
          // point.object.position.x += (Math.random() - 0.5) * 1;

          point.object.material = particleMaterial;

          point.object.updateMatrixWorld(); // Ensure the matrix world is up-to-date

          // Create a new matrix and copy the world matrix of the geometry
          let inverseMatrix = new THREE.Matrix4()
            .copy(point.object.matrixWorld)
            .invert();

          let markerLocalPosition = marker.position
            .clone()
            .applyMatrix4(inverseMatrix);

          particleMaterial.uniforms.uMousePosition.value = markerLocalPosition;
        }
      }

      if (event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouse.z = 0;
      }
    }

    ///plane tryre  setip
        const planeGeometry = new THREE.PlaneGeometry(PLANE_SIZE,PLANE_SIZE);
    const planeMaterial = new THREE.ShaderMaterial({
      extensions: { derivatives: "#extension GL_OES_standard_derivatives : enable" },
      vertexShader: verttyre,
      fragmentShader: fragtyre,
      side: THREE.DoubleSide,
      uniforms: {
      umouse2:{ value: new THREE.Vector3(0, 0, 0) },
        resolution: { value: new THREE.Vector4(0, 0, 0, 0) },
        umouse: { value: new THREE.Vector3(0, 0, 0) }
      },transparent:true
    });
    planeMaterial.uniforms.umouse.value=new THREE.Vector3(0, 0, 0);
    planeMaterial.uniforms.umouse2.value=new THREE.Vector3(0, 0, 0);
    const planetyre = new THREE.Mesh(planeGeometry, planeMaterial);
// planetyre.visible=false
    planetyre.rotation.x = Math.PI / 2; // Rotate the plane to be horizontal
    planetyre.scale.multiplyScalar(9)
    scene.add(planetyre);
 const collider = addPhysics(
      planetyre,
      'fixed',
      true,
      () => {
        planetyre.rotation.x -= Math.PI / 2
      },
      'cuboid',
      {
        width: PLANE_SIZE / 2,
        height: 0.001,
        depth: PLANE_SIZE / 2,
      }
    ).collider
    //

console.log(collider,"cciiiidcvdvdv ")


////small ghrsaas
function smallgra(){
           const v1 = new THREE.Vector3(0, 0, 0);
    const v2 = new THREE.Vector3(1, 0, 0); // Example: 1 unit along X-axis
    const v3 = new THREE.Vector3(0.5, 1, 0); // Example: 0.5 units along X, 1 unit along Y
    const geometry = new THREE.BufferGeometry();    const positions = new Float32Array([
        v1.x, v1.y, v1.z,
        v2.x, v2.y, v2.z,
        v3.x, v3.y, v3.z
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }); // Green color, render both sides







  }

////small ghrsaas

    const animate = function () {
    stats.update()
      const elapsedTime = Date.now() - startTime;
      // controls.update();
// cube1.position.x=Math.sin(elapsedTime)
      let t = clock.getElapsedTime();
        const amplitude= 9; // how far the cube moves left-right
  const speed = 0.4;    
      cube1.position.x = Math.tan(t * speed) * amplitude;
  cube1.position.z = Math.cos(t * speed) * amplitude; 
  
//   //tryemark


//       const origin2 = cube1.position.clone();
//   //  camera.position.copy(origin2.multiplyScalar(20))
// camera.position.y=4*1.3
//       camera.lookAt(origin2.clone())
// const direction2 = new THREE.Vector3(0, -1, 0); // Downward
// direction2.normalize();

// raycastertyre.set(origin2, direction2);
//   const arrowHelper2 = new THREE.ArrowHelper(direction2, origin2, 2, "red");
// // scene.add(arrowHelper2);
// const intersects2 = raycastertyre.intersectObject(planetyre);
// if (intersects2.length > 0) {
//   const hit = intersects2[0];
//   // console.log("Hit222222222 the plane at:", hit.point);

//   // Convert world hit point to plane local space
//   const localPoint = planetyre.worldToLocal(hit.point.clone());

//   // Convert to UV
//   // Your plane is 7x7, centered at origin => map -3.5 to +3.5 => UV (0 to 1)
//   const uv = new THREE.Vector2(
//     (localPoint.x + PLANE_SIZE/2) / PLANE_SIZE,
//     (localPoint.y +PLANE_SIZE/2) / PLANE_SIZE
//   );
  

//   planetyre.material.uniforms.umouse2.value.set(uv.x - 0.5, uv.y - 0.5, 0);
// }
//  else {
//   console.log("No intersection with plane    intt22222");
// }

//       //
//       marker.position.x = Math.sin(t * 0.5) * 5;
//       marker.position.y = Math.cos(t * 0.3) * 5;
//       marker.position.z = Math.cos(t * 0.3) * 5;
//       raycaster.ray.intersectPlane(plane, intersectionPoint);

//       // Move marker to the intersection point
//       marker.position.copy(intersectionPoint);
//       raycaster.setFromCamera(mouse, camera);

//       grassUniforms.iTime.value = elapsedTime;
//       particleMaterial.uniforms.uTime.value = elapsedTime;
//       particleMaterial.uniforms.uMousePosition.value = marker.position;
//       // raycaster.set(marker.position, new THREE.Vector3(0, -1, 0)); // Casting downward

//       //
//    if (arrgrass.length > 1000) {
//   const carPos = new THREE.Vector3();
//   cube1.getWorldPosition(carPos);

//   const exclusionRadius = 3; // Adjust to your needs

//   // Clear and re-assign indices based on visibility
//   indices.length = 0;

//   arrgrass.forEach((blade) => {
//     // Convert blade localPos to world position
//     const worldBladePos = grassmesh.localToWorld(new THREE.Vector3(blade.localPos.clone().x,0,blade.localPos.clone().y));

//     const distance = worldBladePos.distanceTo(carPos);
// const dx = Math.abs(worldBladePos.x - carPos.x);
// const dz = Math.abs(worldBladePos.z - carPos.z);

// const squareSize = 0.9; // Half-size of the square area
//     if (distance < exclusionRadius) {   //ciecleif
//     // if (   dx < 2 && dz < squareSize/20) { 
//       blade.visible = false;
//     } else {
// //  checkblade(blade)

//   blade.indices.forEach((indice) => indices.push(indice));
//         blade.visible = false;
//     }
//   });

//   // Update the index buffer so the mesh redraws only visible blades
//   grassmesh.geometry.setIndex(indices);
//   grassmesh.geometry.attributes.position.needsUpdate = true;
//   grassmesh.geometry.attributes.uv.needsUpdate = true;
//   grassmesh.geometry.attributes.color.needsUpdate = true;
// }

      // cube2.position.x+=Math.sin(elapsedTime*0.1)
      //  console.log(  cube1.position.distanceTo(cube1.position),"is the distnce")

      // scene.traverse(function (object) {
      //     // This function will be called for every object in the scene
      //     // 'object' refers to the current object being processed
      //     if (object.isMesh) {

      // if (object.name="grass") {
      //   console.log(object.position.distanceTo(cube1.position),"gtassobj")
      // }
      //         // Perform actions on mesh objects, e.g., change material, update properties
      //         // object.material.color.set(0xff0000);
      //     }

      //     // You can also check for other object types like Camera, Group, etc.
      // });

      window.requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
    // Cleanup
    return () => {
      // window.removeEventListener("mousemove", onMouseMove);

      renderer.dispose();
      scene.clear();
    };
  }, []);



  return <canvas ref={canvasRef} />;
};

export default DancingGrass;

console.log(RAPIER,"rrrrrrrrrrrrrrrrrrrrrrrrrrr")
export { RAPIER }
// export const useGltfLoader = () => gltfLoader
// export const useTextureLoader = () => textureLoader
// export const useLoader = () => generalLoader
export const usePhysics =  () =>   physicsWorld;
export const usePhysicsObjects =  () =>   physicsObjects;