    // src/presentation/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    // TODO: Handle different error types
            // - Default → 500
    let status = 500;
            // - ValidationError → 400
    if (err.message.includes('Invalid') || err.message.includes('required')) {
        status = 400;
            // - NotFoundError → 404
    } else if (err.message.includes('not found')) {
        status = 404;
            // - ConflictError → 409
    } else if (err.message.includes('exists') || err.message.includes('already')) {
        status = 409;
    } 
    
    res.status(status).json({
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;