import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import * as dat from 'dat.gui';
import * as TWEEN from '@tweenjs/tween.js'; // Animation with tween.js for cases where we need to animate between two values


import nebula from '../assets/img/nebula.jpg';
import stars from '../assets/img/stars.jpg';
import grass from '../assets/img/grass.jpeg.jpg';

import daylightBox_Back from '../assets/img/DayLight/DaylightBox_Back.jpeg';
import daylightBox_Bottom from '../assets/img/DayLight/DaylightBox_Bottom.jpeg';
import daylightBox_Front from '../assets/img/DayLight/DaylightBox_Front.jpeg';
import daylightBox_Left from '../assets/img/DayLight/DaylightBox_Left.jpeg';
import daylightBox_Right from '../assets/img/DayLight/DaylightBox_Right.jpeg';
import daylightBox_Top from '../assets/img/DayLight/DaylightBox_Top.jpeg';

const renderer = new THREE.WebGLRenderer();     // This is usefull because it will allow us to render our scene in a web browser
renderer.setSize( window.innerWidth, window.innerHeight );      // This will set the size of the renderer to the size of the window
document.body.appendChild(renderer.domElement);       // This will add the renderer to the DOM

const scene = new THREE.Scene();        // This will create a scene

renderer.shadowMap.enabled = true;     // This will enable the shadow map






/* AXES AND GRID HELPERS */
const axesHelper = new THREE.AxesHelper( 30 );       // This will create an axes helper
scene.add( axesHelper );                            // This will add the axes helper to the scene

const gridHelper = new THREE.GridHelper( 200, 200 );       // This will create a grid helper
scene.add( gridHelper );                                // This will add the grid helper to the scene












/* CAMERA */

// Creating Perspective Camera
const camera = new THREE.PerspectiveCamera(
    75, // Field of view: 75-degree angle.
    window.innerWidth / window.innerHeight, // Aspect ratio: based on window size.
    0.1, // Near plane: objects visible from 0.1 units away.
    1000 // Far plane: objects visible up to 1000 units away.
);

// Allowing Orbital control the camera
const orbit = new OrbitControls(camera, renderer.domElement);       // This will create an orbit control
orbit.update();

// Setting initial position
const HEIGHT_OFFSET = 5;        // Camera normal height
const CAMERA_SPEED = 1;
const CAMERA_ANGULAR_SPEED = 1;
camera.position.set(10, HEIGHT_OFFSET, 30);       // This will set the camera position















/* TEXTURES */

// Background Loader
//renderer.setClearColor(0x000055);       // This will set the background color of the scene

const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(stars);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    daylightBox_Back,
    daylightBox_Front,
    daylightBox_Top,
    daylightBox_Bottom,
    daylightBox_Right,
    daylightBox_Left,
]);

// new THREE.TextureLoader().load(stars, function(texture) {

//     var geometry = new THREE.BoxGeometry( 1000,1000,1000 );
//     var material = new THREE.MeshStandardMaterial({
//         color: 0xffffff,
//         map: texture,
//         side: THREE.BackSide
//     });
//     var cube = new THREE.Mesh( geometry, material );
//     cube.position.y = -20;
//     scene.add(cube);
// });













/* GEOMETRY */

// Box 1
// const boxGeometry = new THREE.BoxGeometry();        // This will create a box geometry
// const boxMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );       // This will create a box material
// const box = new THREE.Mesh( boxGeometry, boxMaterial );       // This will create a box mesh
// scene.add( box );       // This will add the box to the scene 
// box.receiveShadow = true;       // This will enable the box to receive shadow

// const boxID = box.id;     // This will get the sphere id




// Box 2
// const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
// const box2Material = new THREE.MeshStandardMaterial({
//     //color: 0x00ff00,
//     //map: textureLoader.load(nebula),
//     side: THREE.DoubleSide,
//     wireframe: false,
// });
//box2.material.map = textureLoader.load(nebula);       // This will add a texture to the box
// const box2MultiMaterial = [
//     new THREE.MeshStandardMaterial({map: textureLoader.load(stars)}), // Right side
//     new THREE.MeshStandardMaterial({map: textureLoader.load(nebula)}), // Left side
//     new THREE.MeshStandardMaterial({map: textureLoader.load(stars)}), // Top side
//     new THREE.MeshStandardMaterial({map: textureLoader.load(nebula)}), // Bottom side
//     new THREE.MeshStandardMaterial({map: textureLoader.load(stars)}), // Front side
//     new THREE.MeshStandardMaterial({map: textureLoader.load(stars)}), // Back side
// ];
// // const box2 = new THREE.Mesh(box2Geometry, box2Material);
// const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
// box2.position.set(5, 10, -5);
// box2.castShadow = true;       // This will enable the box to cast shadow
// box2.name = 'box2';       // This will set the box name
// scene.add(box2);




// Sphere
// const sphereGeometry = new THREE.SphereGeometry( 1 , 20, 20 );       // This will create a sphere geometry
// const sphereMaterial = new THREE.MeshStandardMaterial({
//     color: 0x000000,
//     side: THREE.DoubleSide,
//     wireframe: false
// });       // This will create a sphere material
// const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );       // This will create a sphere mesh
// scene.add( sphere );       // This will add the sphere to the scene
// sphere.position.set(5, 50, 5);        // This will set the sphere position
// sphere.castShadow = true;       // This will enable the sphere to cast shadow
// const sphereID = sphere.id;     // This will get the sphere id



// Texture for Plane
const grassTexture = textureLoader.load(grass); // Load the grass texture
grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping; // Enable texture repetition
grassTexture.repeat.set(8, 8); // Set repetition amount (4x4 in this case)
// Plane
const planeGeometry = new THREE.PlaneGeometry(200, 200);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff , 
    side: THREE.DoubleSide,
    map: grassTexture
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = - 0.5 * Math.PI;
plane.receiveShadow = true;



// Desk Model
// Scene 3D Model
// const gltfLoader = new GLTFLoader();
// gltfLoader.load('./desk.glb', function(glb) {
//     console.log(glb);
//     scene.add(glb.scene);
//     glb.scene.position.set(0, 0, 0);
//     glb.scene.scale.set(0.01, 0.01, 0.01);
//     glb.scene.rotation.set(0, 0, 0);
// }, function(xhr) {
//     console.log(xhr.loaded / xhr.total * 100 + '% loaded');
// }, function(error) {
//     console.log(error);
// });














/* WORKSHOP 1 */

// Workshop 1 - DFS and BFS
const ref_coordinate = [-11, 0, -2]

// 1 - Create a Vector with some (x, y, z) coordinates representing a 3D node
let coord_vector = [[11, 16, 0], [5, 12, 0], [17, 12, 0], [2, 8, 0], [8, 8, 0],
                    [14, 8, 0], [20, 8, 0], [0.5, 4, 0], [3.5, 4, 0], [6.5, 4, 0]];


// 2 - Create Ligation Matrix
let lig_matrix = [[0, 1, 1, 0, 0, 0, 0, 0, 0, 0],   // 0
                  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],   // 1
                  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],   // 2
                  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],   // 3
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   // 4
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // 5
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // 6
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // 7
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // 8
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];  // 9

// 3 - Create 3D representation
// 3.1 - Create node geometrys
let esf_vector = [];
for(let i = 0; i < coord_vector.length; i++){
    const sphereGeometry1 = new THREE.SphereGeometry( 0.5 , 10, 10 );       // This will create a sphere geometry
    const sphereMaterial1 = new THREE.MeshStandardMaterial({
        color: 0x555555,
        side: THREE.DoubleSide,
        wireframe: false
    });       // This will create a sphere material
    const sphere = new THREE.Mesh( sphereGeometry1, sphereMaterial1 );       // This will create a sphere mesh
    scene.add( sphere );       // This will add the sphere to the scene
    esf_vector.push(sphere);

    sphere.position.set(coord_vector[i][0] + ref_coordinate[0], coord_vector[i][1] + ref_coordinate[1], coord_vector[i][2] + ref_coordinate[2]);        // This will set the sphere position
    sphere.castShadow = true;       // This will enable the sphere to cast shadow
}

// 3.2 - Create edge geometries
for (let i = 0; i < lig_matrix.length; i++) {
    for (let j = 0; j < lig_matrix[i].length; j++) {
        if (lig_matrix[i][j] === 1) {
            const points = [];
            points.push(new THREE.Vector3(
                coord_vector[i][0] + ref_coordinate[0], 
                coord_vector[i][1] + ref_coordinate[1], 
                coord_vector[i][2] + ref_coordinate[2]
            ));
            points.push(new THREE.Vector3(
                coord_vector[j][0] + ref_coordinate[0], 
                coord_vector[j][1] + ref_coordinate[1], 
                coord_vector[j][2] + ref_coordinate[2]
            ));

            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
        }
    }
}

// 4 - Create DFS and BFS functions

async function delayStep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 4.1 - Mark Node Function
function markNode(node, color) {
    if (color === 'red') {  // Visited
        esf_vector[node].material.color.set(0xff0000);
    } else if (color === 'yellow') {   // Middle
        esf_vector[node].material.color.set(0xffff00);
    } else if (color === 'green') { // Actual
        esf_vector[node].material.color.set(0x00ff00);
    } else if (color === 'default') {  // Default
        esf_vector[node].material.color.set(0x555555);
    }
}

// 4.2 - DFS
let dfsRunning = false;

async function startDFS() {
    if (!dfsRunning) {
        resetWorkshop1();

        dfsRunning = true;
        currentState1 = 'DFS';

        await DFS(0, lig_matrix); // Assuming DFS is an async function
        
        dfsRunning = false;
        console.log("DFS complete");
        currentState1 = 'idle';
    }
}

let delayDFS = 1000; // 1 second
async function DFS(node, lig_matrix) {
    markNode(node, 'green');
    for (let i = 0; i < lig_matrix[node].length; i++) {
        if (lig_matrix[node][i] === 1) {
            await delayStep(delayDFS);
            markNode(node, 'yellow');
            await DFS(i, lig_matrix);
            markNode(node, 'green');
        }
    }
    await delayStep(delayDFS);
    markNode(node, 'red');
}

// 4.3 - BFS
let bfsRunning = false;

async function startBFS() {
    if (!bfsRunning) {
        resetWorkshop1();
        bfsRunning = true;
        currentState1 = 'BFS';

        let queue = [];
        queue.push(0);
        await BFS(queue, lig_matrix); // Assuming BFS is an async function

        bfsRunning = false;
        currentState1 = 'idle';
        console.log("BFS complete");
    }
}

let delayBFS = 1000; // 1 second
async function BFS(queue, lig_matrix) {
    if (queue.length === 0) {
        await delayStep(delayBFS);
        return;
    }
    let node = queue.shift();
    markNode(node, 'green');
    for (let i = 0; i < lig_matrix[node].length; i++) {
        if (lig_matrix[node][i] === 1) {
            await delayStep(delayBFS);
            queue.push(i);
            markNode(i, 'yellow');
        }
    }
    await delayStep(delayBFS);
    markNode(node, 'red');
    await BFS(queue, lig_matrix);
}

// 5 - State of the workshop
let currentState1 = 'idle'; // Possible states: 'idle', 'DFS', 'BFS', 'reset'

function resetWorkshop1() {
    for (let i = 0; i < esf_vector.length; i++) {
        markNode(i, 'default');
    }
    currentState1 = 'idle';
}


// 6 - 3D Buttons

function createTextTexture(text, fontsize, fontface, color, backgroundColor) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = fontsize + "px " + fontface;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    return new THREE.CanvasTexture(canvas);
}

// Create text textures
const dfsTexture = createTextTexture('DFS', 60, 'Arial', 'white', 'black');
const bfsTexture = createTextTexture('BFS', 60, 'Arial', 'white', 'black');

// Create materials with text textures
const dfsMaterial = new THREE.MeshBasicMaterial({ map: dfsTexture });
const bfsMaterial = new THREE.MeshBasicMaterial({ map: bfsTexture });

// Create cylinders
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 32);
const dfsCylinder = new THREE.Mesh(cylinderGeometry, dfsMaterial);
const bfsCylinder = new THREE.Mesh(cylinderGeometry, bfsMaterial);

// Set positions
dfsCylinder.position.set(-3, 0, 15);
dfsCylinder.rotation.set(0, Math.PI / 2, 0);
bfsCylinder.position.set(3, 0, 15);
bfsCylinder.rotation.set(0, Math.PI / 2, 0);

// Add to the scene
scene.add(dfsCylinder);
scene.add(bfsCylinder);

// Get button IDs
const dfsCylinderID = dfsCylinder.id;
const bfsCylinderID = bfsCylinder.id;




// 7 - Event Handlers

window.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName === 'r' || keyName === 'R') {
        resetWorkshop1();
        resetWorkshop2();
        resetWorkshop3();
    }
});




















/* WORKSHOP 2 */

// Workshop 1 - Binary Search into Ordered Array
const ref_coordinate2 = [33, 0, -2]

// 1 - Create a Vector with some (x, y, z) coordinates representing a 3D node
let coord_vector2 = [[0.5, 4, 0], [2.5, 4, 0], [4.5, 4, 0], [6.5, 4, 0], [8.5, 4, 0],
                    [10.5, 4, 0], [12.5, 4, 0], [14.5, 4, 0], [16.5, 4, 0], [18.5, 4, 0],
                    [20.5, 4, 0], [22.5, 4, 0], [24.5, 4, 0], [26.5, 4, 0], [28.5, 4, 0],
                    [30.5, 4, 0], [32.5, 4, 0], [34.5, 4, 0], [36.5, 4, 0], [38.5, 4, 0]];

// 2 - Create Ligation Matrix
let ordered_vector = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ,12 ,13 ,14 ,15 ,16 ,17 ,18 ,19 ,20];

// 3 - Create 3D representation
// 3.1 - Create bar geometrys
let bar_vector = [];
for(let i = 0; i < ordered_vector.length; i++){
    const cylinderGeometry2 = new THREE.CylinderGeometry(0.5, 0.5, ordered_vector[i], 10 );       // This will create a cylinder geometry
    const cylinderMaterial2 = new THREE.MeshStandardMaterial({
        color: 0x555555,
        side: THREE.DoubleSide,
        wireframe: false
    });       // This will create a cylinder material
    const cylinder = new THREE.Mesh( cylinderGeometry2, cylinderMaterial2 );       // This will create a cylinder mesh
    scene.add( cylinder );       // This will add the cylinder to the scene
    bar_vector.push(cylinder);

    cylinder.position.set(coord_vector2[i][0] + ref_coordinate2[0], coord_vector2[i][1] + ref_coordinate2[1] + ordered_vector[i]/2, coord_vector2[i][2] + ref_coordinate2[2]);        // This will set the cylinder position
    cylinder.castShadow = true;       // This will enable the cylinder to cast shadow
}

// 4 - Create DFS and BFS functions

// 4.1 - Mark Bar Function
function markBar(idx, color) {
    if (idx < 0 || idx >= bar_vector.length) {
        return;
    }
    if (color === 'red') {  // Visited
        bar_vector[idx].material.color.set(0xff0000);
    } else if (color === 'yellow') {   // Middle
        bar_vector[idx].material.color.set(0xffff00);
    } else if (color === 'green') { // Actual
        bar_vector[idx].material.color.set(0x00ff00);
    } else if (color === 'default') {  // Default
        bar_vector[idx].material.color.set(0x555555);
    }
}

// 4.2 - Binary Search
let bsRunning = false;

async function startBS(value) {
    if (!bsRunning) {
        resetWorkshop2();
        bsRunning = true;
        currentState2 = 'BS';

        await BS(value, 0, bar_vector.length - 1); // Assuming BS is an async function
        
        bsRunning = false;
        currentState2 = 'idle';
        console.log("BS complete");
    }
}

let delayBS = 1000; // 1 second
async function BS(value, init, end) {
    let mid = Math.floor((init + end) / 2);
    markBar(mid, 'yellow');
    await delayStep(delayBS);

    if (value === ordered_vector[mid]) {
        markBar(mid, 'green');
        await delayStep(delayBS);
        return;
    } else if (value < ordered_vector[mid]) {
        for (let i = mid; i <= end; i++) {
            markBar(i, 'red');
        }
        await delayStep(delayBS);
        await BS(value, init, mid - 1);
    } else {
        for (let i = init; i <= mid; i++) {
            markBar(i, 'red');
        }
        await delayStep(delayBS);
        await BS(value, mid + 1, end);
    }
}

// 5 - State of the workshop2
let currentState2 = 'idle'; // Possible states: 'idle', 'BFS', 'reset'

function resetWorkshop2() {
    for (let i = 0; i < bar_vector.length; i++) {
        markBar(i, 'default');
    }
    currentState2 = 'idle';
}


























/* WORKSHOP 3 */

// Workshop 1 - Binary Search into Ordered Array
const ref_coordinate3 = [-55, 0, -2]

// 1 - Create a Vector with some (x, y, z) coordinates representing a 3D node
let coord_vector3 = [[0.5, 4, 0], [2.5, 4, 0], [4.5, 4, 0], [6.5, 4, 0], [8.5, 4, 0],
                    [10.5, 4, 0], [12.5, 4, 0], [14.5, 4, 0], [16.5, 4, 0], [18.5, 4, 0]];

// 2 - Create Ligation Matrix
let unordered_vector = [3, 1, 4, 6, 5, 8, 7, 2, 10, 9];

// 3 - Create 3D representation
// 3.1 - Create bar geometrys
let bar_vector3 = [];
for(let i = 0; i < unordered_vector.length; i++){
    const cylinderGeometry2 = new THREE.CylinderGeometry(0.5, 0.5, unordered_vector[i], 10 );       // This will create a cylinder geometry
    const cylinderMaterial2 = new THREE.MeshStandardMaterial({
        color: 0x555555,
        side: THREE.DoubleSide,
        wireframe: false
    });       // This will create a cylinder material
    const cylinder = new THREE.Mesh( cylinderGeometry2, cylinderMaterial2 );       // This will create a cylinder mesh
    scene.add( cylinder );       // This will add the cylinder to the scene
    bar_vector3.push(cylinder);

    cylinder.position.set(coord_vector3[i][0] + ref_coordinate3[0], coord_vector3[i][1] + ref_coordinate3[1] + unordered_vector[i]/2, coord_vector3[i][2] + ref_coordinate3[2]);        // This will set the cylinder position
    cylinder.castShadow = true;       // This will enable the cylinder to cast shadow
}

// 4 - Create Bubble Sort function

// 4.1 - Mark Bar 3 Function
function markBar3(idx, color, new_bar_vector3) {
    if (idx < 0 || idx >= new_bar_vector3.length) {
        return;
    }
    if (color === 'red') {
        new_bar_vector3[idx].material.color.set(0xff0000);
    } else if (color === 'yellow') {
        new_bar_vector3[idx].material.color.set(0xffff00);
    } else if (color === 'green') {
        new_bar_vector3[idx].material.color.set(0x00ff00);
    } else if (color === 'default') {
        new_bar_vector3[idx].material.color.set(0x555555);
    }
}


// 4.2 - Translate Bars Smoothly
function changeBarPosition(idx1, idx2, new_bar_vector3) {
    if (idx1 < 0 || idx1 >= new_bar_vector3.length || idx2 < 0 || idx2 >= new_bar_vector3.length) {
        return;
    }
    const bar1 = new_bar_vector3[idx1];
    const bar2 = new_bar_vector3[idx2];
    const bar1Pos = bar1.position;
    const bar2Pos = bar2.position;

    // Keep the y-coordinate (height) unchanged
    const bar1Y = bar1Pos.y;
    const bar2Y = bar2Pos.y;

    const bar1Tween = new TWEEN.Tween(bar1Pos).to({x: bar2Pos.x, y: bar1Y, z: bar2Pos.z}, 1000);
    const bar2Tween = new TWEEN.Tween(bar2Pos).to({x: bar1Pos.x, y: bar2Y, z: bar1Pos.z}, 1000);

    bar1Tween.start();
    bar2Tween.start();

    // Change the position in the new_bar_vector3
    const aux = new_bar_vector3[idx1];
    new_bar_vector3[idx1] = new_bar_vector3[idx2];
    new_bar_vector3[idx2] = aux;
}


// 4.3 - Bubble Sort
let bbsRunning = false;

async function startBBSort() {
    if (!bbsRunning) {
        resetWorkshop3();
        bbsRunning = true;
        currentState3 = 'BBS';

        let new_vector = unordered_vector.slice();
        let new_bar_vector3 = bar_vector3.slice();
        await BBSort(new_vector, new_bar_vector3); // Assuming BBS is an async function
        
        bbsRunning = false;
        console.log("BS complete");
        currentState3 = 'idle';
    }
}

let delayBBS = 1500; // 1 second
async function BBSort(new_vector, new_bar_vector3) {
    for (let i = 0; i < new_vector.length; i++) {
        for (let j = 0; j < new_vector.length - i - 1; j++) {
            markBar3(j, 'green', new_bar_vector3);
            markBar3(j + 1, 'yellow', new_bar_vector3);
            if (new_vector[j] > new_vector[j + 1]) {
                changeBarPosition(j, j + 1, new_bar_vector3);
                let aux = new_vector[j];
                new_vector[j] = new_vector[j + 1];
                new_vector[j + 1] = aux;
            }
            await delayStep(delayBBS);
            markBar3(j, 'default', new_bar_vector3);
            markBar3(j + 1, 'default', new_bar_vector3);
        }
        markBar3(new_vector.length - i - 1, 'red', new_bar_vector3);
    }
}

// 5 - State of the workshop2
let currentState3 = 'idle'; // Possible states: 'idle', 'BFS', 'reset'

function resetBarPosition(idx) {
    if (idx < 0 || idx >= bar_vector3.length) {
        return;
    }
    bar_vector3[idx].position.set(coord_vector3[idx][0] + ref_coordinate3[0], coord_vector3[idx][1] + ref_coordinate3[1] + unordered_vector[idx]/2, coord_vector3[idx][2] + ref_coordinate3[2]);
}



function resetWorkshop3() {
    for (let i = 0; i < bar_vector3.length; i++) {
        markBar3(i, 'default', bar_vector3);
        resetBarPosition(i);
    }
    currentState3 = 'idle';
}

// 6 - 3D Buttons

function createTextTexture(text, fontsize, fontface, color, backgroundColor) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = fontsize + "px " + fontface;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    return new THREE.CanvasTexture(canvas);
}

// Create text textures
const resetBbsTexture = createTextTexture('RESET', 60, 'Arial', 'white', 'black');
const bbsTexture = createTextTexture('BBSort', 60, 'Arial', 'white', 'black');

// Create materials with text textures
const resetBbsMaterial = new THREE.MeshBasicMaterial({ map: resetBbsTexture });
const bbsMaterial = new THREE.MeshBasicMaterial({ map: bbsTexture });

// Create cylinders
const cylinderGeometry3 = new THREE.CylinderGeometry(1, 1, 0.5, 32);
const resetBbsCylinder = new THREE.Mesh(cylinderGeometry3, resetBbsMaterial);
const bbsCylinder = new THREE.Mesh(cylinderGeometry3, bbsMaterial);

// Set positions
resetBbsCylinder.position.set(-47, 0, 15);
resetBbsCylinder.rotation.set(0, Math.PI / 2, 0);
bbsCylinder.position.set(-41, 0, 15);
bbsCylinder.rotation.set(0, Math.PI / 2, 0);

// Add to the scene
scene.add(resetBbsCylinder);
scene.add(bbsCylinder);

// Get button IDs
const resetBbsCylinderID = resetBbsCylinder.id;
const bbsCylinderID = bbsCylinder.id;





































/* LIGHT */

// // Ambient Light
const ambientLight = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
scene.add( ambientLight );



// Directional Light
// const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
// directionalLight.position.set( 10, 20, 0 );

// scene.add( directionalLight );
// directionalLight.castShadow = true;     // This will enable the sphere to receive shadow

// const dLightHelper = new THREE.DirectionalLightHelper( directionalLight, 3 );
// scene.add( dLightHelper );
// directionalLight.shadow.camera.bottom = - 20;
// directionalLight.shadow.camera.top = 20;
// directionalLight.shadow.camera.left = - 20;
// directionalLight.shadow.camera.right = 20;
// // Shadow helper for directional light
// const dLightShadowHelper = new THREE.CameraHelper( directionalLight.shadow.camera );
// scene.add( dLightShadowHelper );



// Spot Light
const spotLight = new THREE.SpotLight( 0xffffff, 10 );
scene.add( spotLight );
spotLight.position.set( 0, 50, 50 );
spotLight.castShadow = true;     // This will enable the sphere to receive shadow
spotLight.angle = 0.2;


const sLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( sLightHelper );



// Fog
// scene.fog = new THREE.Fog( 0xffffff, 0, 100 );
scene.fog = new THREE.FogExp2( 0xc4d6dd, 0.01 );






















/* Mouse Raycasting */
const mousePosition = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    // Normalized Position
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

const mouseRayCaster = new THREE.Raycaster();

let allowMouseRaycasting = false;
window.addEventListener('click', () => {
    allowMouseRaycasting = !allowMouseRaycasting;
});













/* AUDIO */

















// GUI
const gui = new dat.GUI();
const options = {
    // sphereColor: 0xffff00,
    // wireframe: false,
    // speed: 0.01,
    helperLines: true,
    angle: 1,
    penumbra: 0.3,
    decay: 0.3,
};

// gui.addColor(options, 'sphereColor').onChange(function(e){
//     sphere.material.color.set(e);
// });

// gui.add(options, 'wireframe').onChange(function(e){
//     sphere.material.wireframe = e;
// });

// gui.add(options, 'speed').min(0.01).max(0.1).step(0.01).onChange(function(e){
//     speed = e;
// });

gui.add(options, 'helperLines').onChange(function(e){
    axesHelper.visible = e;
    gridHelper.visible = e;
    //dLightHelper.visible = e;
    //dLightShadowHelper.visible = e;
    sLightHelper.visible = e;
});

gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'decay', 0, 1);























let step = 0;

function animate(time) {

    
    // SpotLight parameters
    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.decay = options.decay;
    sLightHelper.update();

    // // Changing the sphere position
    // step += options.speed;
    // sphere.position.y = 15 * Math.abs(Math.sin(2*step)) + sphere.geometry.parameters.radius;
    // sphere.position.x = 5 * Math.abs(Math.sin(step));

    // Mouse Raycasting (Straight foward from mouse position)
    mouseRayCaster.setFromCamera(mousePosition, camera);
    if (allowMouseRaycasting) {
        // Perform raycasting
        let intersects = mouseRayCaster.intersectObjects(scene.children);
        //console.log(intersects);
        for (let i = 0; i < intersects.length; i++) {
            // When the mouse gets buttons from workshop1, activate the corresponding function
            if (intersects[i].object.id === dfsCylinderID) {
                currentState1 = 'DFS';
                startDFS();
            } else if (intersects[i].object.id === bfsCylinderID) {
                currentState1 = 'BFS';
                startBFS();
            }

            // When the mouse gets bars from workshop2, activate the BS for the corresponding value
            for (let i = 0; i < intersects.length; i++) {
                // Check if the intersected object is in bar_vector
                const indexOfBar = bar_vector.indexOf(intersects[i].object);
                if (indexOfBar !== -1 && currentState2 === 'idle') {
                    currentState2 = 'BS';
                    startBS(ordered_vector[indexOfBar]);
                }
            }

            // When the mouse gets buttons from workshop3, activate the corresponding function
            if (intersects[i].object.id === resetBbsCylinderID) {
                resetWorkshop3();
            } else if (intersects[i].object.id === bbsCylinderID) {
                currentState3 = 'BBS';
                startBBSort();
            }


        };
        allowMouseRaycasting = false;
    };
    console.log('Current State 1:', currentState1);
    console.log('Current State 2:', currentState2);
    console.log('Current State 3:', currentState3);


    // Update TWEEN animations
    TWEEN.update(time);

    renderer.render( scene, camera );       // This will render the scene and the camera
}

renderer.setAnimationLoop(animate);       // This will render the scene and the camera