const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX, offsetY;

cubes.forEach(cube => {
    cube.addEventListener("mousedown", (event) => {
        selectedCube = event.target;
        const rect = selectedCube.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        selectedCube.style.zIndex = 1000;
    });
});

document.addEventListener("mousemove", (event) => {
    if (!selectedCube) return;
    
    const containerRect = container.getBoundingClientRect();
    let newX = event.clientX - containerRect.left - offsetX;
    let newY = event.clientY - containerRect.top - offsetY;

    // Ensure the cube stays within the container boundaries
    newX = Math.max(0, Math.min(containerRect.width - selectedCube.offsetWidth, newX));
    newY = Math.max(0, Math.min(containerRect.height - selectedCube.offsetHeight, newY));
    
    selectedCube.style.position = "absolute";
    selectedCube.style.left = `${newX}px`;
    selectedCube.style.top = `${newY}px`;
});

document.addEventListener("mouseup", () => {
    if (selectedCube) {
        selectedCube.style.zIndex = "auto";
    }
    selectedCube = null;
});