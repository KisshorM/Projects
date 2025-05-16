function analyzeText() {
    let text = document.getElementById("textInput").value;

    if (!text) {
        document.getElementById("result").innerText = "Please enter some text.";
        return;
    }

    fetch("https://hate-speech-api-351689837670.us-central1.run.app/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data); // Debug log
        document.getElementById("result").innerText = "Prediction: " + data.prediction;
    })
    
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error connecting to server.";
    });
}
