function sendMessage() {

    var message = document.getElementById("messageInput").value;
    appendMessage(message);

    var body = JSON.stringify({ message: message });

    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to send message');
            }
        })
        .then(data => {

            appendMessage(data.message);
            console.log("Message received:", data.message);

        })
        .catch(error => {
            console.error("Error:", error);
        });
}


function appendMessage(message) {

    var responseDiv = document.getElementById("response");
    var messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.textContent = message;
    responseDiv.appendChild(messageDiv);

}
