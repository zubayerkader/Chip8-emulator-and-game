function textObj(canvasObj, msg, x, y) {
    this.x = x;
    this.y = y;
    this.canvas = canvasObj;
    this.msg = msg;
}

textObj.prototype.printToCanvas = function () {
    let temp = this.canvas.getContext("2d");
    temp.font = "13px Arial";
    temp.fillStyle = "white";
    temp.fillText(this.msg, this.x, this.y);
}

textObj.prototype.setXY = function (x, y) {
    this.x = x;
    this.y = y;
}

textObj.prototype.setCanvas = function (canvasObj) {
    this.canvas = canvasObj;
}

textObj.prototype.setMsg = function (msg) {
    this.msg = msg;
}

