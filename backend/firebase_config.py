import os
import json
import firebase_admin
from firebase_admin import credentials

def init_firebase():
    if firebase_admin._apps:
        return

    firebase_json = os.getenv("FIREBASE_CREDENTIALS")

    if firebase_json:
        cred = credentials.Certificate(json.loads(firebase_json))
        firebase_admin.initialize_app(cred)
        print("Firebase initialized from Render Environment Variable")
        return

    cert_path = os.path.join(os.path.dirname(__file__), "serviceAccountKey.json")

    if os.path.exists(cert_path):
        cred = credentials.Certificate(cert_path)
        firebase_admin.initialize_app(cred)
        print("Firebase initialized from local JSON file")
        return

    raise Exception("Firebase credentials not found.")