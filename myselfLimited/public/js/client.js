const socket = io();

const inboxPeople = document.querySelector(".inbox__people");
const usernameInput = document.getElementById("username-input");
const setUsernameBtn = document.getElementById("set-username");

let userName = "";

setUsernameBtn.addEventListener("click", () => {
  const newUsername = usernameInput.value.trim();
  if (!newUsername) return;
  userName = newUsername;
  socket.emit("new user", userName);
  usernameInput.value = "";
});

const addToUsersBox = function (userName) {
  if (!!document.querySelector(`.${userName}-userlist`)) {
    return;
  }
  const userBox = `
    <div class="chat_id ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
  inboxPeople.innerHTML += userBox;
};

socket.on("new user", function (data) {
  data.map(function (user) {
    return addToUsersBox(user);
  });
});

socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();
});

const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");

const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  const myMsg = `
  <div class="outgoing__message">
    <div class="sent__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
};

// To time out the typing indicator.
let typingTimeout;

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value || !userName) {
    return;
  }
  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });
  // When the message is sent the indicator stops.
  socket.emit("stop typing");
  inputField.value = "";
});

// For the typing to start/stop via emit.
inputField.addEventListener("input", () => {
  if (!userName) return;
  socket.emit("typing");
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    socket.emit("stop typing");
  }, 1500);
});

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
});

// Allow for the showing and hiding of the typing indicator.
const typingIndicator = document.getElementById("typing-indicator");

socket.on("typing", function (username) {
  typingIndicator.textContent = `${username} is typing...`;
});

socket.on("stop typing", function () {
  typingIndicator.textContent = "";
});
