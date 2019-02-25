const httpUtility = new Object;

httpUtility.sendResponse =  (res, ResError, resData) => {
    res.send({
        error: ResError,
        data: resData
    })
}

module.exports = httpUtility