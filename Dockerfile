# Use official Python base image
FROM python:3.9-slim

# Set working directory inside the container
WORKDIR /app

# Copy all necessary files into the container
COPY templates/ templates/
COPY static/ static/
COPY app.py .
COPY hate_speech_model.pkl .
COPY tfidf_vectorizer.pkl .

# Install required Python packages
RUN pip install --no-cache-dir flask flask-cors joblib scikit-learn

# Expose the port your app runs on
EXPOSE 8080

# Command to run the Flask app
CMD ["python", "app.py"]
