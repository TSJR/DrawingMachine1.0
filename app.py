from flask import Flask, render_template, request
import json

app = Flask(__name__)
@app.route("/")

def index():
    return render_template("index.html")

@app.route("/imgData", methods=['POST'])
def process_stuff():
    file = request.files['file']
    print(file)
    data = json.loads(file.read())
    print(data)
    return ("/")
if __name__ == "__main__":
    app.run(debug=True)

