// Your code here.
let draggedItem = null;
let offsetX = 0, offsetY = 0;

// Select all items
const items = document.querySelectorAll(".item");

items.forEach(item => {
  item.addEventListener("mousedown", (e) => {
    draggedItem = item;
    offsetX = e.clientX - item.getBoundingClientRect().left;
    offsetY = e.clientY - item.getBoundingClientRect().top;
    item.style.position = "absolute";
    item.style.zIndex = "1000";
  });
});

document.addEventListener("mousemove", (e) => {
  if (!draggedItem) return;
  
  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;
  
  // Ensure the item stays within bounds
  const container = document.querySelector(".items");
  const rect = container.getBoundingClientRect();
  const itemRect = draggedItem.getBoundingClientRect();
  
  if (x < rect.left) x = rect.left;
  if (y < rect.top) y = rect.top;
  if (x + itemRect.width > rect.right) x = rect.right - itemRect.width;
  if (y + itemRect.height > rect.bottom) y = rect.bottom - itemRect.height;
  
  draggedItem.style.left = x + "px";
  draggedItem.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  if (draggedItem) {
    draggedItem.style.zIndex = "1";
    draggedItem = null;
  }
});