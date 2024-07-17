const $roomsForm = document.querySelector("#roomsForm");
const $inputs = document.querySelectorAll(".form-input");
const $roomList = document.querySelector(".roomList");

function Room(name, number, adult, children, select) {
  this.name = name;
  this.number = number;
  this.adult = adult;
  this.children = children;
  this.select = select;
  this.time = new Date();
}


let ALL_ROOMS = JSON.parse(localStorage.getItem("rooms")) || [];


const renderRooms = (rooms) => {
  $roomList.innerHTML = "";

  rooms.forEach((room, index) => {
    const roomElement = document.createElement("div");
    roomElement.innerHTML = `
      <div>
        <h3>${room.name}</h3>
        <p>Number: ${room.number}</p>
        <p>Adults: ${room.adult}</p>
        <p>Children: ${room.children}</p>
        <p>Select: ${room.select}</p>
        <button data-index="${index}" class="delete-btn">Delete</button>
        <button data-index="${index}" class="update-btn">Update</button>
      </div>
    `;
    $roomList.appendChild(roomElement);
  });
};

const handleItemAction = (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("delete-btn")) {
   
    ALL_ROOMS.splice(index, 1); 
    localStorage.setItem("rooms", JSON.stringify(ALL_ROOMS));
    renderRooms(ALL_ROOMS); 
  } else if (e.target.classList.contains("update-btn")) {
    
    const roomToUpdate = ALL_ROOMS[index];
    alert(`Update room details: ${JSON.stringify(roomToUpdate)}`);
  }
};


renderRooms(ALL_ROOMS);


$roomList.addEventListener("click", handleItemAction);


const createNewRoom = (e) => {
  e.preventDefault();

  let values = Array.from($inputs).map((input) => input.value);

  const room = new Room(...values);

  ALL_ROOMS.push(room);
  localStorage.setItem("rooms", JSON.stringify(ALL_ROOMS)); 
  renderRooms(ALL_ROOMS); 

  $roomsForm.reset(); 
};


$roomsForm.addEventListener("submit", createNewRoom);