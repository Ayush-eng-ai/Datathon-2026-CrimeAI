from fastapi import FastAPI

app = FastAPI(
    title="CrimeIntel AI Backend",
    description="Backend API for Karnataka State Police CrimeIntel AI Chatbot",
    version="1.0.0",
)

@app.get("/")
def root():
    return {
        "message": "CrimeIntel AI Backend is running successfully!"
    }