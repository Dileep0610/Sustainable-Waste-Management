from flask import Blueprint, request
from utils.response import success_response
from services.center_service import CenterService

center_bp = Blueprint('center_routes', __name__)
center_service = CenterService()

@center_bp.route('/get-centers', methods=['GET'])
def get_centers():
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    waste_type = request.args.get('waste_type')
    
    centers = center_service.get_nearby_centers(lat, lng, waste_type)
    
    return success_response(
        message="Collection centers retrieved successfully.",
        data={"centers": centers}
    )
