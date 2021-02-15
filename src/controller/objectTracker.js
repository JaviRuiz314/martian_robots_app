'use strict'



function  _verifyInitialPositionFormat(inPosition) {
    if (typeof (inPosition) !== "array") {
        throw 'Initial position must be an array';
    } else if (inPosition.length !== 3) {
        throw 'The initial position must be an array of two integers and one character';
    } else if (typeof (inPosition[0]) !== "integer" || typeof (inPosition[1]) !== "integer") {
        throw 'The coordinates of the initial position are not integers';
    } else if (typeof (inPosition[2]) !== "string" || inPostion[2] !== /([N||W||E||S])/) {
        throw 'The direction of the initial position is not valid';
    }
    return true;
}

function _verifyCommandString(commandString){
    if(typeof(commandString) !== "string") {
        throw 'The instruction must be a string';
    } else if(inPosition.length > 50) {
        throw 'The instruction string can\'t exceed 50 characters';
    } else if (commandString || commandString !== /([F||L||R])/) {
        throw 'The instruction string contains commands that are not supported';
    }
    return true;
}

async function receiveInstructions(req, res) {
    const 
        areInstructionsValid = (_verifyInitialPositionFormat(req.params.inPosition), _verifyCommandString(req.params.commandString)),
        position = req.params.inPosition;
    if(areInstructionsValid) {
        for(let command of req.params.commandString) {
            position = executeCommand(position, command);
        }
    }

}