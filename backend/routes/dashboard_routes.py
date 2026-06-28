from flask import Blueprint, request
from utils.response import success_response, error_response
from services.firestore_service import FirestoreService

dashboard_bp = Blueprint('dashboard_routes', __name__)
firestore_service = FirestoreService()

@dashboard_bp.route('/dashboard-data', methods=['GET'])
def get_dashboard_data():
    try:
        user_id = request.args.get('userId')
        if not user_id:
            return jsonify({"success": False, "message": "userId is required"}), 400
            
        stats = firestore_service.get_dashboard_stats(user_id)
        if stats is not None:
            return success_response(
                message="Dashboard data retrieved successfully.",
                data=stats
            )
        else:
            return error_response(message="Failed to retrieve dashboard data", status_code=500)
    except Exception as e:
        return error_response(message=str(e), status_code=500)
