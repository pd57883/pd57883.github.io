const map = L.map('map').setView([0, 0], 16);

const tiles = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{
  maxZoom: 20,
  crossOrigin: "Anonymous"
}).addTo(map);

function requestNotificationPermission() {
  if (Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission();
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function success(position) {
  console.log("Latitude: " + position.coords.latitude +
    "\nLongitude: " + position.coords.longitude);

  map.setView([position.coords.latitude, position.coords.longitude], 16);
}

function error(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

function createBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';

  for (let i = 0; i < 16; i++) {
    const cell = document.createElement('div');
    cell.classList.add('board-cell');
    cell.dataset.index = i;

    cell.addEventListener('dragover', allowDrop);
    cell.addEventListener('drop', drop);

    board.appendChild(cell);
  }
}

async function saveRasterMap() {
  const mapElement = document.getElementById('map');

  const canvas = await html2canvas(mapElement, {
    useCORS: true,
    allowTaint: false
  });

  generatePuzzlePieces(canvas);
}

function generatePuzzlePieces(sourceCanvas) {
  const table = document.getElementById('puzzle-table');
  table.innerHTML = '';

  const pieceWidth = sourceCanvas.width / 4;
  const pieceHeight = sourceCanvas.height / 4;
  const pieces = [];

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const pieceCanvas = document.createElement('canvas');
      pieceCanvas.width = pieceWidth;
      pieceCanvas.height = pieceHeight;
      const ctx = pieceCanvas.getContext('2d');

      ctx.drawImage(sourceCanvas, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

      pieceCanvas.classList.add('puzzle-piece');
      pieceCanvas.draggable = true;
      pieceCanvas.id = 'piece-' + (row * 4 + col);
      pieceCanvas.dataset.index = row * 4 + col;

      pieceCanvas.addEventListener('dragstart', drag);

      pieces.push(pieceCanvas);
    }
  }

  pieces.sort(() => Math.random() - 0.5);
  pieces.forEach(p => {
    p.style.width = '12%';
    p.style.height = 'auto';
    table.appendChild(p);
  });

  createBoard();
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const targetCell = ev.target;

  if (targetCell.classList.contains('board-cell') && targetCell.children.length === 0) {
    draggedElement.style.width = '100%';
    draggedElement.style.height = '100%';
    targetCell.appendChild(draggedElement);
    checkWinCondition();
  }
}

function checkWinCondition() {
  const cells = document.querySelectorAll('.board-cell');
  let correctPieces = 0;

  cells.forEach(cell => {
    const pieceInCell = cell.firstChild;
    if (pieceInCell && pieceInCell.dataset.index === cell.dataset.index) {
      correctPieces++;
    }
  });

  if (correctPieces === 16) {
    console.debug("Wszystkie puzzle na właściwym miejscu. Gratulacje!");
    showNotification("Zwycięstwo!", "Ułożyłeś wszystkie puzzle z mapą prawidłowo!");
  }
}

function showNotification(title, bodyText) {
  if (Notification.permission === "granted") {
    new Notification(title, { body: bodyText });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, { body: bodyText });
      }
    });
  }
}

window.onload = () => {
  getLocation();
  requestNotificationPermission();
};
