from flask import Flask
from flask_cors import CORS
import endpoints
import os

is_local = os.environ.get("IS_LOCAL_SERVER").lower() == "true"
if is_local:
    cors_origins = "*"
else:
    cors_origins = "http://localhost:3000"

app = Flask(__name__)
cors = CORS(app, resources={r"/api/analytics": {"origins": cors_origins}})
app.config["CORS_HEADERS"] = "Content-Type"

# Register the blueprint
app.register_blueprint(endpoints.analytics_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
