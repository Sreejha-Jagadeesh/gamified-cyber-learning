from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load your API key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("❌ GOOGLE_API_KEY is missing in your .env file!")

genai.configure(api_key=api_key)

# List available models
print("🔍 Checking available Gemini models...\n")
models = genai.list_models()

for model in models:
    print(f"✅ Model Name: {model.name}")
    print(f"   Supported methods: {model.supported_generation_methods}\n")
