import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// 创建摄像机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 8);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;

document.body.appendChild(renderer.domElement);

// 灯光
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const sunlight = new THREE.DirectionalLight(0xffffff, 2);
sunlight.position.set(10, 20, 10);
scene.add(sunlight);

// 地面
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x667755 })
);

ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// 创建建筑物
function createBuilding(x, y, z, width, height, depth, color) {
    const building = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        new THREE.MeshStandardMaterial({ color })
    );

    building.position.set(x, y, z);
    scene.add(building);
}

// 训练场建筑
createBuilding(-7, 2, -12, 5, 4, 5, 0x777777);
createBuilding(7, 2, -15, 5, 4, 5, 0x888888);
createBuilding(0, 3, -25, 18, 6, 4, 0x555555);

// 训练场掩体
createBuilding(-3, 0.8, -5, 2, 1.6, 1, 0x997744);
createBuilding(3, 0.8, -8, 2, 1.6, 1, 0x997744);

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// 屏幕适配
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});