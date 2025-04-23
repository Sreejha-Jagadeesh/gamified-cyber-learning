from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
import requests
from dotenv import load_dotenv

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load .env
load_dotenv()

# Configure API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "models/gemini-1.5-pro-latest"

# Default backup links
DEFAULT_VIDEOS = [
    "https://www.youtube.com/shorts/OR7RXkHquaU",
    "https://www.youtube.com/watch?v=KVpxP3ZZtAc"
]

def is_video_available(url):
    try:
        response = requests.get(url)
        return response.status_code == 200
    except:
        return False

@app.get("/get-videos")
async def get_videos():
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        prompt = """
        Provide exactly 2 direct YouTube video links related to women's self-defense tutorials.
        The videos must be currently available and public on YouTube.
        Only return the links in this exact JSON format:
        {
            "videos": [
                "https://www.youtube.com/watch?v=XXXXXXXXXXX",
                "https://www.youtube.com/watch?v=XXXXXXXXXXX"
            ]
        }
        """

        response = model.generate_content(prompt)
        text = response.text

        # Extract links
        links = [line.strip() for line in text.split('\n') if "youtube.com" in line]

        # Validate and replace if unavailable
        valid_links = []
        for i, link in enumerate(links[:2]):
            if is_video_available(link):
                valid_links.append(link)
            else:
                valid_links.append(DEFAULT_VIDEOS[i])

        # If Gemini fails to give enough links
        while len(valid_links) < 2:
            valid_links.append(DEFAULT_VIDEOS[len(valid_links)])

        return {"videos": valid_links}

    except Exception as e:
        return {"error": str(e), "videos": DEFAULT_VIDEOS}
