class ResponseHandler {
    sendSuccessResponse = (res, data) => {
        return res.status(200).json(data);
    }

    sendErrorResponse(res, statusCode, message) {
        return res.status(statusCode).json({ error: message });
    }
}

module.exports = ResponseHandler;