from flask import Flask, request, send_file
from flask_cors import CORS
from rembg import remove, new_session
from dotenv import load_dotenv
import io
import os

load_dotenv()

app = Flask(__name__)

CORS(
    app,
    origins=["https://bg-remover-nine-delta.vercel.app"]
)

PORT = int(os.getenv("PORT", 5000))

session = new_session("u2netp")

@app.route('/remove-bg', methods=['POST'])
def remove_bg():
    try:
        file = request.files['image']

        input_data = file.read()

        output_data = remove(
            input_data,
            session=session
        )

        return send_file(
            io.BytesIO(output_data),
            mimetype='image/png'
        )

    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}, 500


@app.route("/")
def home():
    return "Background Remover API Running"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)