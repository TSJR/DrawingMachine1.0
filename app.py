from flask import Flask, render_template, request
import json
from VirtDraw import *

app = Flask(__name__)
@app.route("/")

def index():
    return render_template("index.html")

def col(body):
    return int(body[0][2])

def get_x(body):
    return int(body[0])

def get_y(body):
    return int(body[1])

color_map = {
    "10": 245,
    "9": 220,
    "8": 195,
    "7": 170,
    "6": 145,
    "5": 120,
    "4": 95,
    "3": 70,
    "2": 45,
    "1": 20,
    "0": 0
}
#bodies = bodies[   body[ pixel[]... ]... ]
@app.route("/imgData", methods=['POST'])
def receive_img():
    path = []
    file = request.files['file']
    data = json.loads(file.read())
    bodies = data[0:-2]
    bodies.sort(key=col)
    for i in range(len(bodies) - 2):
        body = bodies[i]
        body.sort(key=get_y)
        body.sort(key=get_x)
        for pixel_data in body:
            path.append((pixel_data[0], pixel_data[1], color_map[pixel_data[2]]))


    with open('data.json', 'w') as f:
        json.dump([path, data[-2], data[-1]], f)
    # draw(path, (data[-2], data[-1]))

    return ("/")
if __name__ == "__main__":
    app.run(debug=True)

