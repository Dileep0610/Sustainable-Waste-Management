from flask import Blueprint, request
from utils.response import success_response, error_response
from services.firestore_service import FirestoreService

history_bp = Blueprint('history_routes', __name__)
firestore_service = FirestoreService()

@history_bp.route('/save-history', methods=['POST'])
def save_history():
    try:
        data = request.get_json()
        user_id = data.get('userId')
        if not user_id:
            return error_response(message="Missing userId", status_code=400)
            
        success = firestore_service.save_scan_history(user_id, data)
        if success:
            return success_response(
                message="History saved successfully.",
                data={}
            )
        else:
            return error_response(message="Failed to save history to Firestore.", status_code=500)
    except Exception as e:
        return error_response(message=str(e), status_code=500)

@history_bp.route('/get-history', methods=['GET'])
def get_history():
    try:
        user_id = request.args.get('userId')
        if not user_id:
            return error_response(message="Missing userId", status_code=400)
            
        history = firestore_service.get_user_history(user_id)
        return success_response(
            message="History retrieved successfully.",
            data={"history": history}
        )
    except Exception as e:
        return error_response(message=str(e), status_code=500)
