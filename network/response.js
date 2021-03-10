exports.success = function (req, res, message, status) {
    let statusCode = status || 200;
    let statusMessage = message || 'Success';
    
    res.status(statusCode).send({
        error: false,
        status,
        body: statusMessage,
    })
}

exports.error = function (req, res, message, status) {
    let statusCode = status || 500;
    let statusMessage = message || 'Internal Server error';

    res.status(statusCode).send({
        error: true,
        status,
        body: statusMessage,
    })
}

// TODO May be could be a goood idea to encapsulate the repeated code between error and success.
