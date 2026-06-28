from flask import Blueprint, request, jsonify
from utils.response import success_response, error_response
from services.groq_service import GroqService
import logging

waste_bp = Blueprint('waste_routes', __name__)
groq_service = GroqService()

@waste_bp.route('/analyze-waste', methods=['POST'])
def analyze_waste():
    try:
        data = request.get_json()
        if not data or 'item' not in data:
            return jsonify({"success": False, "message": "Invalid input: 'item' is required."}), 400
            
        item = data.get('item')
        if not isinstance(item, str):
            return jsonify({"success": False, "message": "Invalid input: 'item' must be a string."}), 400
            
        item = item.strip()
        if not item:
            return jsonify({"success": False, "message": "Invalid input: 'item' cannot be empty."}), 400
            
        result = groq_service.analyze_waste(item)
        
        return jsonify({
            "success": True,
            "result": result,
            "source": "groq"
        })
        
    except Exception as e:
        logging.exception("Error analyzing waste")
        return jsonify({
            "success": False,
            "message": "Unable to analyze waste item."
        }), 500
