from flask import Flask, request, send_file
from flask_cors import CORS
from rembg import remove
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

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
    app.run(debug=True)