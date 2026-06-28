from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from utils.response import error_response

# Import blueprints
from routes.waste_routes import waste_bp
from routes.history_routes import history_bp
from routes.dashboard_routes import dashboard_bp
from routes.center_routes import center_bp

def create_app():
    from firebase_config import init_firebase
    init_firebase()

    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Register blueprints
    app.register_blueprint(waste_bp, url_prefix='/api')
    app.register_blueprint(history_bp, url_prefix='/api')
    app.register_blueprint(dashboard_bp, url_prefix='/api')
    app.register_blueprint(center_bp, url_prefix='/api')
    
    # Centralized error handlers
    @app.errorhandler(404)
    def not_found_error(error):
        return error_response(message="Resource not found", status_code=404)

    @app.errorhandler(500)
    def internal_error(error):
        return error_response(message="Internal server error", status_code=500)
        
    @app.errorhandler(Exception)
    def handle_exception(e):
        # In a real app, log the exception here
        return error_response(message=str(e), status_code=500)

    @app.route("/")
    def index():
        return jsonify({
            "success": True,
            "message": "WasteGuide AI API is running"
        })

    return app

app = create_app()

if __name__ == "__main__":
    app.run(port=Config.PORT, debug=Config.DEBUG)