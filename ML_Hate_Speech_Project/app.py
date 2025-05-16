from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)
CORS(app)

# Load model and vectorizer once at startup
model = joblib.load("hate_speech_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

@app.route("/", methods=["GET"])
def home():
    return render_template("app.html")  # Serve your frontend

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Transform and predict
    text_vectorized = vectorizer.transform([text])
    prediction = model.predict(text_vectorized)[0]
    class_labels = {0: "Offensive", 1: "Hate speech", 2: "Non-toxic"}

    return jsonify({"prediction": class_labels[prediction]})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))  # 8080 for Cloud Run
    app.run(host="0.0.0.0", port=port)
