import os
import json
import re
from groq import Groq

class GroqService:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        self.client = Groq(api_key=self.api_key) if self.api_key else None
        
    def analyze_waste(self, item: str):
        if not self.client:
            raise Exception("Groq API key not configured")
            
        prompt = f"""You are a waste analysis expert. Analyze the given waste item and provide details in ONLY the exact JSON format specified below.
Do not include any markdown, code blocks, explanations, or text outside the JSON.

Item to analyze: {item}

Required JSON format:
{{
  "item": "{item}",
  "category": "string (e.g. Plastic, Paper, Metal, Electronic, etc.)",
  "category_icon": "string (a single suitable emoji)",
  "is_recyclable": boolean,
  "is_hazardous": boolean,
  "is_reusable": boolean,
  "disposal_instructions": "string (clear instructions)",
  "recycling_steps": ["string", "string"],
  "hazard_warning": "string (or empty if none)",
  "eco_suggestions": ["string", "string"],
  "accepted_at": ["string (e.g. Curbside, Recycling Center)"]
}}"""

        response = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=800
        )
        
        content = response.choices[0].message.content.strip()
        
        # Remove markdown code fences if present
        if content.startswith("```"):
            content = re.sub(r"^```(?:json)?\s+", "", content)
            content = re.sub(r"\s+```$", "", content)
            
        try:
            parsed_json = json.loads(content)
            return parsed_json
        except json.JSONDecodeError as e:
            raise Exception(f"Failed to parse JSON response: {str(e)}")
