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

textObj.prototype.clearText = function () {
    let temp = this.canvas.getContext("2d");
    temp.clearRect(this.x,this.y,100,-13);
}

function displayPixel(canvasObj, x,y) {
    this.canvas = canvasObj;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
}

displayPixel.prototype.printToCanvas = function () {
    let temp = this.canvas.getContext("2d");
    temp.fillStyle = "#AAAAAA";
    temp.fillRect(this.x, this.y, this.width, this.height);
}

displayPixel.prototype.clearPixel = function () {
    let temp = this.canvas.getContext("2d");
    temp.clearRect(this.x,this.y,this.width,this.height);
}