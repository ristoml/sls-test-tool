/* This component contains the processing of the Mediapipe landmark-data, like calculating the kneeangles. 
   It's methods are used in the Canvas.js component. */

let leftLeg, rightLeg
let leftHipX,
    leftHipY,
    leftHipZ,
    leftKneeX,
    leftKneeY,
    leftKneeZ,
    leftAnkleX,
    leftAnkleY,
    leftAnkleZ

let rightHipX,
    rightHipY,
    rightHipZ,
    rightKneeX,
    rightKneeY,
    rightKneeZ,
    rightAnkleX,
    rightAnkleY,
    rightAnkleZ

const updatePoseHelperLeft = (results) => { // form the array containing the Mediapipe landmark-data of both hips and left leg
    leftLeg = [
        results.poseLandmarks[24],
        results.poseLandmarks[23],
        results.poseLandmarks[25],
        results.poseLandmarks[27],
    ]
    // store the coordinates for later kneeangle calculation
    leftHipX = results.poseLandmarks[23].x
    leftHipY = results.poseLandmarks[23].y
    leftHipZ = results.poseLandmarks[23].z
    leftKneeX = results.poseLandmarks[25].x
    leftKneeY = results.poseLandmarks[25].y
    leftKneeZ = results.poseLandmarks[25].z
    leftAnkleX = results.poseLandmarks[27].x
    leftAnkleY = results.poseLandmarks[27].y
    leftAnkleZ = results.poseLandmarks[27].z
}
const getLeftLeg = () => {
    return leftLeg
}
const getLeftKneeX = () => {
    return leftKneeX
}
const getLeftKneeY = () => {
    return leftKneeY
}
const getLeftHipY = () => {
    return leftHipY
}
const getLeftAngle = () => { // angle for left knee is calculated here
    return -(180 - (Math.atan2(leftAnkleY - leftKneeY, leftAnkleX - leftKneeX) - Math.atan2(leftHipY - leftKneeY, leftHipX - leftKneeX)) * (180 / Math.PI))
}
const getLeftDepth = () => {
    return Math.acos(((leftHipX - leftKneeX) * (leftAnkleX - leftKneeX) + (leftHipY - leftKneeY) * (leftAnkleY - leftKneeY) + (leftHipZ - leftKneeZ) * (leftAnkleZ - leftKneeZ)) / (Math.sqrt((leftHipX - leftKneeX) ^ 2 + (leftHipY - leftKneeY) ^ 2 + (leftHipZ - leftKneeZ) ^ 2) * Math.sqrt((leftAnkleX - leftKneeX) ^ 2 + (leftAnkleY - leftKneeY) ^ 2 + (leftAnkleZ - leftKneeZ) ^ 2)))
}
//               angle = arccos{[(x2 - x1)          * (x4 - x3)                 + (y2 - y1)                 * (y4 - y3)             + (z2 - z1)                 * (z4 - z3)]            / [√((x2 - x1)2                         + (y2 - y1)2                    + (z2 - z1)2)               * √((x4 - x3)2                          + (y4 - y3)2                    + (z4 - z3)2)]}
// right leg
const updatePoseHelperRight = (results) => {
    rightLeg = [
        results.poseLandmarks[23],
        results.poseLandmarks[24],
        results.poseLandmarks[26],
        results.poseLandmarks[28],
    ]
    rightHipX = results.poseLandmarks[24].x
    rightHipY = results.poseLandmarks[24].y
    rightHipZ = results.poseLandmarks[24].z
    rightKneeX = results.poseLandmarks[26].x
    rightKneeY = results.poseLandmarks[26].y
    rightKneeZ = results.poseLandmarks[26].z
    rightAnkleX = results.poseLandmarks[28].x
    rightAnkleY = results.poseLandmarks[28].y
    rightAnkleZ = results.poseLandmarks[28].z
}
const getRightLeg = () => {
    return rightLeg
}
const getRightKneeX = () => {
    return rightKneeX
}
const getRightKneeY = () => {
    return rightKneeY
}
const getRightHipY = () => {
    return rightHipY
}
const getRightAngle = () => {
    return 180 - (Math.atan2(rightAnkleY - rightKneeY, rightAnkleX - rightKneeX) - Math.atan2(rightHipY - rightKneeY, rightHipX - rightKneeX)) * (180 / Math.PI)
}

export { updatePoseHelperLeft, getLeftLeg, getLeftKneeX, getLeftKneeY, getLeftHipY, getLeftAngle, getLeftDepth, updatePoseHelperRight, getRightLeg, getRightKneeX, getRightKneeY, getRightHipY, getRightAngle }