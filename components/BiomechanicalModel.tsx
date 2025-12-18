
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BiomechanicalModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lights - Warm and cold contrast for depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0xd4af37, 10);
    rimLight.position.set(-5, 2, -2);
    scene.add(rimLight);

    // Materials - Anatomical/Organic
    const muscleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8b2d2d, // Deep muscle red
      roughness: 0.6,
      metalness: 0.1,
      flatShading: false,
      sheen: 1,
      sheenColor: 0xff6666,
    });

    const tendonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xead9c1, // Tendon/Ligament cream
      roughness: 0.3,
      metalness: 0.0,
    });

    const bodyGroup = new THREE.Group();
    scene.add(bodyGroup);

    // Helper: Create Anatomical Block
    const createMuscle = (geo: THREE.BufferGeometry, mat: THREE.Material, pos: [number, number, number], scale: [number, number, number] = [1, 1, 1], rot: [number, number, number] = [0, 0, 0]) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.scale.set(...scale);
      mesh.rotation.set(...rot);
      return mesh;
    };

    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
    const capsuleGeo = new THREE.CapsuleGeometry(1, 1, 16, 32);

    // Torso & Core
    const torso = createMuscle(capsuleGeo, muscleMaterial, [0, 0, 0], [0.35, 0.5, 0.25]);
    bodyGroup.add(torso);

    // Pectorals
    const leftPec = createMuscle(sphereGeo, muscleMaterial, [-0.18, 0.4, 0.18], [0.15, 0.12, 0.1]);
    const rightPec = createMuscle(sphereGeo, muscleMaterial, [0.18, 0.4, 0.18], [0.15, 0.12, 0.1]);
    bodyGroup.add(leftPec, rightPec);

    // Abdominals (6-pack)
    for (let i = 0; i < 3; i++) {
      const leftAbs = createMuscle(sphereGeo, muscleMaterial, [-0.08, 0.15 - i * 0.15, 0.18], [0.06, 0.05, 0.05]);
      const rightAbs = createMuscle(sphereGeo, muscleMaterial, [0.08, 0.15 - i * 0.15, 0.18], [0.06, 0.05, 0.05]);
      bodyGroup.add(leftAbs, rightAbs);
    }

    // Head
    const head = createMuscle(sphereGeo, tendonMaterial, [0, 0.85, 0], [0.18, 0.22, 0.18]);
    bodyGroup.add(head);

    // Hips
    const pelvis = new THREE.Group();
    pelvis.position.y = -0.5;
    bodyGroup.add(pelvis);
    const gluteLeft = createMuscle(sphereGeo, muscleMaterial, [-0.15, 0, 0], [0.2, 0.18, 0.2]);
    const gluteRight = createMuscle(sphereGeo, muscleMaterial, [0.15, 0, 0], [0.2, 0.18, 0.2]);
    pelvis.add(gluteLeft, gluteRight);

    // Legs (Anatomical Thighs and Shins)
    const thighLeft = new THREE.Group();
    thighLeft.position.set(-0.2, 0, 0);
    pelvis.add(thighLeft);
    const quadLeft = createMuscle(sphereGeo, muscleMaterial, [0, -0.3, 0], [0.18, 0.35, 0.18]);
    thighLeft.add(quadLeft);

    const thighRight = new THREE.Group();
    thighRight.position.set(0.2, 0, 0);
    pelvis.add(thighRight);
    const quadRight = createMuscle(sphereGeo, muscleMaterial, [0, -0.3, 0], [0.18, 0.35, 0.18]);
    thighRight.add(quadRight);

    const shinLeft = new THREE.Group();
    shinLeft.position.y = -0.6;
    thighLeft.add(shinLeft);
    const calfLeft = createMuscle(sphereGeo, muscleMaterial, [0, -0.3, 0], [0.12, 0.3, 0.12]);
    shinLeft.add(calfLeft);

    const shinRight = new THREE.Group();
    shinRight.position.y = -0.6;
    thighRight.add(shinRight);
    const calfRight = createMuscle(sphereGeo, muscleMaterial, [0, -0.3, 0], [0.12, 0.3, 0.12]);
    shinRight.add(calfRight);

    // Arms (Deltoids, Biceps, Forearms)
    const deltoidLeft = createMuscle(sphereGeo, muscleMaterial, [-0.4, 0.55, 0], [0.18, 0.18, 0.18]);
    const deltoidRight = createMuscle(sphereGeo, muscleMaterial, [0.4, 0.55, 0], [0.18, 0.18, 0.18]);
    bodyGroup.add(deltoidLeft, deltoidRight);

    const armUpperLeft = new THREE.Group();
    armUpperLeft.position.set(-0.4, 0.55, 0);
    bodyGroup.add(armUpperLeft);
    const bicepLeft = createMuscle(sphereGeo, muscleMaterial, [0, -0.25, 0], [0.12, 0.25, 0.12]);
    armUpperLeft.add(bicepLeft);

    const armUpperRight = new THREE.Group();
    armUpperRight.position.set(0.4, 0.55, 0);
    bodyGroup.add(armUpperRight);
    const bicepRight = createMuscle(sphereGeo, muscleMaterial, [0, -0.25, 0], [0.12, 0.25, 0.12]);
    armUpperRight.add(bicepRight);

    const forearmLeft = new THREE.Group();
    forearmLeft.position.y = -0.5;
    armUpperLeft.add(forearmLeft);
    const armLowerLeft = createMuscle(sphereGeo, muscleMaterial, [0, -0.25, 0], [0.08, 0.22, 0.08]);
    forearmLeft.add(armLowerLeft);

    const forearmRight = new THREE.Group();
    forearmRight.position.y = -0.5;
    armUpperRight.add(forearmRight);
    const armLowerRight = createMuscle(sphereGeo, muscleMaterial, [0, -0.25, 0], [0.08, 0.22, 0.08]);
    forearmRight.add(armLowerRight);

    // Background scanner grid (more subtle)
    const grid = new THREE.GridHelper(10, 20, 0xd4af37, 0x18181b);
    grid.position.y = -1.8;
    scene.add(grid);

    // Animation Loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.04;

      // Squat-like biomechanical movement
      const moveFactor = (Math.sin(time) + 1) / 2; // 0 to 1
      
      // Pelvis drops
      pelvis.position.y = -0.5 - (moveFactor * 0.5);
      
      // Hips rotate
      thighLeft.rotation.x = -moveFactor * 1.3;
      thighRight.rotation.x = -moveFactor * 1.3;
      
      // Knees counter-rotate
      shinLeft.rotation.x = moveFactor * 2.4;
      shinRight.rotation.x = moveFactor * 2.4;

      // Arms balance
      armUpperLeft.rotation.x = -moveFactor * 0.8;
      armUpperRight.rotation.x = -moveFactor * 0.8;
      forearmLeft.rotation.x = -moveFactor * 0.5;
      forearmRight.rotation.x = -moveFactor * 0.5;

      // Body sway
      bodyGroup.rotation.y = Math.sin(time * 0.3) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full min-h-[500px] relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[90%] h-[90%] border border-gold/5 rounded-full animate-pulse blur-3xl opacity-10"></div>
      </div>
    </div>
  );
};

export default BiomechanicalModel;
