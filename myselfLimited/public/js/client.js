// Initialise socket.io connection to the server.
const socket = io();

// DOM references to elements that will be interacted with.
const inboxPeople = document.querySelector(".inbox__people");
const usernameInput = document.getElementById("username-input");
const setUsernameBtn = document.getElementById("set-username");

// Store the user's entered name.
let userName = "";

// User is registered on the server after username entered.
setUsernameBtn.addEventListener("click", () => {
  const newUsername = usernameInput.value.trim();
  if (!newUsername) return;
  userName = newUsername;
  socket.emit("new user", userName);
  usernameInput.value = "";
});

// Add user the user list.
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

// Update the full list after a new user is added.
socket.on("new user", function (data) {
  data.map(function (user) {
    return addToUsersBox(user);
  });
});

// Removes the respective user's name from the list when they leave
socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();
});

// DOM references for the message form and message history.
const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");

// Adds the respective message to the pool of messages, marking as sender or receiver.
const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  // For messages the sender receives.
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

  // For messages the sender makes.
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

// Handle the message form inputs.
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

// Save data of the new message sent.
socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
});

// DOM reference that allow for the display and discrete hiding of the typing indicator.
const typingIndicator = document.getElementById("typing-indicator");

// Displays the typing indicator/
socket.on("typing", function (username) {
  typingIndicator.textContent = `${username} is typing...`;
});

// Stops displaying the typing indicator.
socket.on("stop typing", function () {
  typingIndicator.textContent = "";
});

const addSystemMessage = (text) => {
  const notification = `
    <div class="message-item">
      <span class="system-message">${text}</span>
    </div>`;
  messageBox.innerHTML += notification;
  // Auto-scroll to the latest message
  messageBox.scrollTop = messageBox.scrollHeight;
};

// Show a notification when a user joins the chat
socket.on("user joined", function (username) {
  addSystemMessage(`${username} has joined the chat 👋`);
});

// Show a notification when a user leaves the chat
socket.on("user left", function (username) {
  addSystemMessage(`${username} has left the chat 🏃`);
});
