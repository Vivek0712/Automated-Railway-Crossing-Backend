const config = {
    database: {
        //connectionString: 'mongodb://localhost:27017/automatedRailwayCrossing',
        connectionString : 'mongodb://admin:admin1@ds117469.mlab.com:17469/automatedrailwaycrossing'
    },
    webTokenSecret: "totallyasecRet",
    messageCodes: {
        fromServerGateOpen: '0',
        toServerGateOpened: '1',
        fromServerGateClose: '2',
        toServerGateClosed: '5',
        toServerTrainDetectedNonDirectionalised: '7'
    }
}

module.exports = config