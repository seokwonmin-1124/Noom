const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const soket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

soket.addEventListener("open", () => {
    console.log("Connected to Server");
})

soket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})

soket.addEventListener("close", () => {
    console.log("Disconnected from Server");
})

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    soket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handeNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    soket.send(makeMessage("new_nick", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handeNickSubmit);