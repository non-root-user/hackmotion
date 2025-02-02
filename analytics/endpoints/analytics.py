from flask import Blueprint, request
from flask_cors import cross_origin
from datetime import datetime
import os

analytics_bp = Blueprint('analytics', __name__)
is_reverse_proxy = os.environ.get('IS_REVERSE_PROXY', False)


def log_to_file(data):
    folder = os.environ.get('LOG_FOLDER')
    if not folder:
        raise ValueError('LOG_FOLDER environment variable not set')
    today = datetime.now().strftime('%d-%m-%Y')
    path = f'{folder}/{today}.log'

    with open(path, 'a+') as file:
        file.write(f'{data}\n')
    return True


@analytics_bp.route('/api/analytics', methods=['POST'])
@cross_origin()
def analytics():
    request_data = request.get_json()
    data = {"ip": request.environ.get(
        'HTTP_X_REAL_IP')} if is_reverse_proxy else {"ip": request.remote_addr}
    data.update(request_data)
    log_to_file(data)
    print(request_data)
    return '{"status": "success"}'
