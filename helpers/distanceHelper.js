const gpsDistance = require("gps-distance");

let distanceBetween = (pointA, pointB) => {
    return gpsDistance(pointA[0], pointA[1], pointB[0], pointB[1]) * 1000;
}

let middlePoint = (pointA, pointB) => {
    let newLat = (pointA[0] + pointB[0]) / 2;
    let newLong = (pointA[1] + pointB[1]) / 2;
    return [newLat, newLong];
}


let placesHeader = (pointA, pointB) => {
    let distance = distanceBetween(pointA, pointB);
    let middle = middlePoint(pointA, pointB);
    let radius = distance/2;

    return {
        location: middle,
        radius: radius
    }
}

module.exports = {
    parameters: placesHeader
}