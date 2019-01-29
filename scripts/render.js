function printToCanvas(canvasObj, msg, x, y) {
    let temp = canvasObj.getContext("2d");
    temp.font = "12px Arial";
    temp.fillStyle = "white";
    temp.fillText(msg, x,y);
}

