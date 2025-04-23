# # from fastapi import FastAPI
# # from fastapi.middleware.cors import CORSMiddleware
# # from pydantic import BaseModel
# # import google.generativeai as genai
# # from dotenv import load_dotenv
# # import os

# # # Load API Key
# # load_dotenv()
# # genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# # app = FastAPI()

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["http://localhost:3000"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # with open("episodes.txt", encoding="utf-8") as file:
# #     episodes = file.read().split('episode - ')[1:]

# # class Interaction(BaseModel):
# #     episode_id: int
# #     step: int
# #     user_choice: str = ""

# # def generate_scammer_dialogue(episode_text, step, user_choice):
# #     prompt = f"""
# #     You are acting as a realistic scammer in a cybersecurity learning simulation.

# #     Episode context: "{episode_text[:1000]}..."

# #     User's previous choice: "{user_choice}"

# #     Now, create STEP {step} of this scam attempt.

# #     For each step:
# #     - Start with a convincing scammer dialogue.
# #     - Provide exactly 2 options:
# #         1️⃣ One SAFE option to protect the user.
# #         2️⃣ One RISKY option that might lead the user into the scam.

# #     IMPORTANT:
# #     - After 3 risky steps in a row, end the conversation with: "❌ You have been scammed! 💀"
# #     - If the user takes any SAFE option at any step, end the conversation with: "✅ You are safe! 🎉"

# #     Respond ONLY in this format:
# #     Dialogue: <scammer's message>
# #     Safe Option: <safe action>
# #     Risky Option: <risky action>
# #     """

# #     model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
# #     response = model.generate_content(prompt)
# #     return response.text

# # @app.post("/interact")
# # def interact(data: Interaction):
# #     episode = episodes[data.episode_id - 1]
# #     result = generate_scammer_dialogue(episode, data.step, data.user_choice)

# #     # Parsing Gemini's response
# #     lines = result.split('\n')
# #     dialogue = next((l.replace("Dialogue: ", "") for l in lines if l.startswith("Dialogue:")), "")
# #     safe_option = next((l.replace("Safe Option: ", "") for l in lines if l.startswith("Safe Option:")), "")
# #     risky_option = next((l.replace("Risky Option: ", "") for l in lines if l.startswith("Risky Option:")), "")

# #     return {
# #         "scammer_message": dialogue,
# #         "choices": [
# #             {"text": safe_option, "safe": True},
# #             {"text": risky_option, "safe": False}
# #         ]
# #     }

# '''This is for API single step query'''
# # from fastapi import FastAPI
# # from fastapi.middleware.cors import CORSMiddleware
# # from pydantic import BaseModel
# # import google.generativeai as genai
# # from dotenv import load_dotenv
# # import os

# # # Load API Key
# # load_dotenv()
# # genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# # app = FastAPI()

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["http://localhost:3000"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # with open("episodes.txt", encoding="utf-8") as file:
# #     episodes = file.read().split('episode - ')[1:]

# # class Interaction(BaseModel):
# #     episode_id: int
# #     user_choice: str = ""

# # def generate_scammer_dialogue(episode_text):
# #     prompt = f"""
# #     You are acting as a realistic scammer in a cybersecurity learning simulation.

# #     Context of this episode: "{episode_text[:1000]}..."

# #     Create the scam introduction.

# #     Provide exactly:
# #     - Scammer's dialogue.
# #     - Safe option.
# #     - Risky option.

# #     Format:
# #     Dialogue: <scammer's message>
# #     Safe Option: <safe action>
# #     Risky Option: <risky action>
# #     """

# #     model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
# #     response = model.generate_content(prompt)
# #     return response.text

# # @app.post("/interact")
# # def interact(data: Interaction):
# #     episode = episodes[data.episode_id - 1]

# #     # If user already made a choice
# #     if data.user_choice:
# #         if data.user_choice.lower() in ["exit"]:
# #             return {
# #                 "scammer_message": "Thanks for playing! 🚀",
# #                 "choices": []
# #             }
# #         elif data.user_choice.lower() in ["retry", "try again"]:
# #             return {
# #                 "scammer_message": "Restarting the scenario...",
# #                 "choices": []
# #             }
# #         elif any(safe_word in data.user_choice.lower() for safe_word in ["inform", "verify", "hang", "safe"]):
# #             return {
# #                 "scammer_message": "✅ You escaped the scam! 🎉",
# #                 "choices": [
# #                     {"text": "Retry", "safe": True},
# #                     {"text": "Exit", "safe": True}
# #                 ]
# #             }
# #         else:
# #             return {
# #                 "scammer_message": "❌ You have been scammed! 💀",
# #                 "choices": [
# #                     {"text": "Retry", "safe": True},
# #                     {"text": "Exit", "safe": True}
# #                 ]
# #             }

# #     # First step: show scammer dialogue + options
# #     result = generate_scammer_dialogue(episode)

# #     lines = result.strip().split('\n')
# #     dialogue = next((l.replace("Dialogue: ", "") for l in lines if l.startswith("Dialogue:")), "")
# #     safe_option = next((l.replace("Safe Option: ", "") for l in lines if l.startswith("Safe Option:")), "")
# #     risky_option = next((l.replace("Risky Option: ", "") for l in lines if l.startswith("Risky Option:")), "")

# #     if not dialogue or not safe_option or not risky_option:
# #         return {
# #             "scammer_message": "⚠️ Failed to load the scam scenario. Please try again.",
# #             "choices": [
# #                 {"text": "Retry", "safe": True},
# #                 {"text": "Exit", "safe": True}
# #             ]
# #         }

# #     return {
# #         "scammer_message": dialogue,
# #         "choices": [
# #             {"text": safe_option, "safe": True},
# #             {"text": risky_option, "safe": False}
# #         ]
# #     }
# '''
# #complete static 

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class Interaction(BaseModel):
#     episode_id: int
#     step: int
#     user_choice: str = ""

# # ✅ Multi-step scam scenarios
# scenarios = [
#     [   # Episode 1 – Bank KYC Scam
#         {
#             "dialogue": "Hello, I'm calling from your bank regarding a mandatory KYC update.",
#             "safe": "Hang up and contact the bank.",
#             "risky": "Proceed with KYC update."
#         },
#         {
#             "dialogue": "Please provide your Aadhar number to continue.",
#             "safe": "Refuse and visit the bank.",
#             "risky": "Share Aadhar number."
#         },
#         {
#             "dialogue": "Now, please provide the OTP you just received.",
#             "safe": "Refuse and report the scam.",
#             "risky": "Share the OTP."
#         }
#     ],
#     [   # Episode 2 – Lottery Winner Scam
#         {
#             "dialogue": "Congratulations! You've won ₹10,00,000 in a lucky draw.",
#             "safe": "Ignore and report the message.",
#             "risky": "Proceed to claim the prize."
#         },
#         {
#             "dialogue": "To transfer your prize, please provide your bank details.",
#             "safe": "Refuse and block the number.",
#             "risky": "Share bank details."
#         },
#         {
#             "dialogue": "For final verification, please share the OTP sent to your phone.",
#             "safe": "Refuse and contact your bank.",
#             "risky": "Share the OTP."
#         }
#     ],
#     [   # Episode 3 – Job Offer Scam
#         {
#             "dialogue": "We have a work-from-home job offer for ₹50,000/month. Interested?",
#             "safe": "Refuse and verify the company.",
#             "risky": "Yes, tell me more."
#         },
#         {
#             "dialogue": "Great! Just pay ₹1,000 as a registration fee.",
#             "safe": "Refuse and research the company.",
#             "risky": "Pay the registration fee."
#         },
#         {
#             "dialogue": "To complete your application, please provide your bank account details.",
#             "safe": "Refuse and report this.",
#             "risky": "Share bank details."
#         }
#     ],
#     [   # Episode 4 – Electricity Bill Scam
#         {
#             "dialogue": "Your electricity bill is overdue. Pay now to avoid disconnection.",
#             "safe": "Contact the official electricity board.",
#             "risky": "Proceed to pay."
#         },
#         {
#             "dialogue": "Please enter your account details to complete payment.",
#             "safe": "Refuse and check the official site.",
#             "risky": "Provide account details."
#         },
#         {
#             "dialogue": "For confirmation, share the OTP sent to your number.",
#             "safe": "Refuse and report the scam.",
#             "risky": "Share the OTP."
#         }
#     ]
# ]

# @app.post("/interact")
# def interact(data: Interaction):
#     episode_steps = scenarios[data.episode_id - 1]

#     # ✅ If safe choice selected
#     if data.user_choice and any(
#         safe_word in data.user_choice.lower()
#         for safe_word in ["hang", "refuse", "ignore", "block", "report"]
#     ):
#         return {
#             "scammer_message": "✅ You escaped the scam! 🎉",
#             "choices": [
#                 {"text": "Retry", "safe": True},
#                 {"text": "Exit", "safe": True}
#             ]
#         }

#     # ✅ If risky choice on final step
#     if data.step >= len(episode_steps):
#         return {
#             "scammer_message": "❌ You have been scammed! 💀",
#             "choices": [
#                 {"text": "Retry", "safe": True},
#                 {"text": "Exit", "safe": True}
#             ]
#         }

#     # ✅ Next step
#     current_step = episode_steps[data.step]
#     return {
#         "scammer_message": current_step["dialogue"],
#         "choices": [
#             {"text": current_step["safe"], "safe": True},
#             {"text": current_step["risky"], "safe": False}
#         ]
#     }
# '''
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import os
# import google.generativeai as genai
# import base64
# import requests

# # Configure Gemini API
# USE_GEMINI = False 
# if USE_GEMINI:
#     from dotenv import load_dotenv
#     load_dotenv()
#     genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class Interaction(BaseModel):
#     episode_id: int
#     step: int
#     user_choice: str = ""

# # ✅ Static multi-step scam scenarios


# def generate_voice(text):
#     """Generate speech from text using Gemini API."""
#     model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
    
#     response = model.generate_content({
#         "text": text,
#         "voice": "en-US-Standard-C"  # Choose a natural-sounding voice
#     })
    
#     if response and "audioContent" in response:
#         audio_data = base64.b64decode(response["audioContent"])
#         audio_path = f"static/scammer_voice.mp3"
        
#         with open(audio_path, "wb") as f:
#             f.write(audio_data)
        
#         return f"http://localhost:8000/{audio_path}"
#     return None

# @app.post("/interact")
# def interact(data: Interaction):
#     episode_steps = scenarios[data.episode_id - 1]
    
#     if data.step >= len(episode_steps):
#         return {
#             "scammer_message": "❌ You have been scammed! 💀",
#             "audio_url": generate_voice("You have been scammed!"),
#             "choices": [
#                 {"text": "Retry", "safe": True},
#                 {"text": "Exit", "safe": True}
#             ]
#         }

#     step_data = episode_steps[data.step]
#     audio_url = generate_voice(step_data["dialogue"])
    
#     return {
#         "scammer_message": step_data["dialogue"],
#         "audio_url": audio_url,
#         "choices": [
#             {"text": step_data["safe"], "safe": True},
#             {"text": step_data["risky"], "safe": False}
#         ]
#     }

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

USE_GEMINI = False  # Set to False to switch to static version

if USE_GEMINI:
    import google.generativeai as genai
    from dotenv import load_dotenv
    load_dotenv()
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Interaction(BaseModel):
    episode_id: int
    step: int
    user_choice: str = ""

# ✅ Static multi-step scam scenarios
scenarios = [
    [   # Episode 4
        {
            "dialogue": "Your electricity bill is overdue. Pay now to avoid disconnection.",
            "safe": "Contact the official electricity board.",
            "risky": "Proceed to pay."
        },
        {
            "dialogue": "Enter your account details to complete payment.",
            "safe": "Refuse and check the official site.",
            "risky": "Provide account details."
        },
        {
            "dialogue": "Share the OTP to confirm payment.",
            "safe": "Refuse and report the scam.",
            "risky": "Share the OTP."
        }
    ],
    [   # Episode 1
        {
            "dialogue": "Hello, I'm calling from your bank regarding a mandatory KYC update.",
            "safe": "Hang up and contact the bank.",
            "risky": "Proceed with KYC update."
        },
        {
            "dialogue": "Please provide your Aadhar number to continue.",
            "safe": "Refuse and visit the bank.",
            "risky": "Share Aadhar number."
        },
        {
            "dialogue": "Now, please provide the OTP you just received.",
            "safe": "Refuse and report the scam.",
            "risky": "Share the OTP."
        }
    ],
    [   # Episode 2
        {
            "dialogue": "Congratulations! You've won ₹10,00,000 in a lucky draw.",
            "safe": "Ignore and report the message.",
            "risky": "Proceed to claim the prize."
        },
        {
            "dialogue": "Provide your bank details for the prize transfer.",
            "safe": "Refuse and block the number.",
            "risky": "Share bank details."
        },
        {
            "dialogue": "Share the OTP sent to your phone for confirmation.",
            "safe": "Refuse and contact your bank.",
            "risky": "Share the OTP."
        }
    ],
    [   # Episode 3
        {
            "dialogue": "We have a ₹50,000/month work-from-home job. Interested?",
            "safe": "Refuse and verify the company.",
            "risky": "Yes, tell me more."
        },
        {
            "dialogue": "Great! Pay ₹1,000 as a registration fee.",
            "safe": "Refuse and research the company.",
            "risky": "Pay the fee."
        },
        {
            "dialogue": "Please provide your bank details.",
            "safe": "Refuse and report the scam.",
            "risky": "Share bank details."
        }
    ],
    [   # Episode 4
        {
            "dialogue": "Your electricity bill is overdue. Pay now to avoid disconnection.",
            "safe": "Contact the official electricity board.",
            "risky": "Proceed to pay."
        },
        {
            "dialogue": "Enter your account details to complete payment.",
            "safe": "Refuse and check the official site.",
            "risky": "Provide account details."
        },
        {
            "dialogue": "Share the OTP to confirm payment.",
            "safe": "Refuse and report the scam.",
            "risky": "Share the OTP."
        }
    ]
]

def generate_scammer_dialogue(episode_text, step, user_choice):
    prompt = f"""
    You are an advanced scammer in a cybercrime awareness simulation.

    Scenario context: "{episode_text[:1000]}..."

    User's previous action: "{user_choice}"

    For STEP {step}, generate:
    - Scammer's message.
    - Safe Option.
    - Risky Option.

    Format strictly as:
    Dialogue: <scammer's message>
    Safe Option: <safe action>
    Risky Option: <risky action>
    """

    model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
    response = model.generate_content(prompt)
    return response.text

@app.post("/interact")
def interact(data: Interaction):
    if not USE_GEMINI:
        episode_steps = scenarios[data.episode_id - 1]

        if data.user_choice and any(word in data.user_choice.lower() for word in ["hang", "refuse", "ignore", "block", "report"]):
            return {
                "scammer_message": "✅ You escaped the scam! 🎉",
                "choices": [{"text": "Retry", "safe": True}, {"text": "Exit", "safe": True}]
            }

        if data.step >= len(episode_steps):
            return {
                "scammer_message": "❌ You have been scammed! 💀",
                "choices": [{"text": "Retry", "safe": True}, {"text": "Exit", "safe": True}]
            }

        step_data = episode_steps[data.step]
        return {
            "scammer_message": step_data["dialogue"],
            "choices": [{"text": step_data["safe"], "safe": True}, {"text": step_data["risky"], "safe": False}]
        }
    else:
        # DYNAMIC GEMINI VERSION
        with open("episodes.txt", encoding="utf-8") as file:
            episodes = file.read().split('episode - ')[1:]

        episode_text = episodes[data.episode_id - 1]
        result = generate_scammer_dialogue(episode_text, data.step, data.user_choice)

        lines = result.strip().split('\n')
        dialogue = next((l.replace("Dialogue: ", "") for l in lines if l.startswith("Dialogue:")), "")
        safe_option = next((l.replace("Safe Option: ", "") for l in lines if l.startswith("Safe Option:")), "")
        risky_option = next((l.replace("Risky Option: ", "") for l in lines if l.startswith("Risky Option:")), "")

        if not dialogue or not safe_option or not risky_option:
            return {
                "scammer_message": "⚠️ Error loading conversation. Retry!",
                "choices": [{"text": "Retry", "safe": True}, {"text": "Exit", "safe": True}]
            }

        return {
            "scammer_message": dialogue,
            "choices": [{"text": safe_option, "safe": True}, {"text": risky_option, "safe": False}]
        }
