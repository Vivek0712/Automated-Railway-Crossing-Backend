const config = {
    database: {
        connectionString: 'mongodb://localhost:27017/automatedRailwayCrossing'
    },
    webTokenSecret: "totallyasecRet",
    messageCodes: {
        fromServerGateOpen : '0',
        fromServerGateClose : '2',
        toServerGateOpened : '1',
        toServerGateClosed : '5',
        toServerTrainDetected : '7'
    }
}

module.exports = config