from flask import Flask, request, send_file
from flask_cors import CORS
from rembg import remove
from PIL import Image
from dotenv import load_dotenv
import io
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

PORT = int(os.getenv("PORT", 5000))

@app.route('/remove-bg', methods=['POST'])
def remove_bg():
    file = request.files['image']
    input_data = file.read()
    output_data = remove(input_data)
    return send_file(
        io.BytesIO(output_data),
        mimetype='image/png'
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)