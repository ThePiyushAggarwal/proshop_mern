const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, _req, res, _next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID is not in the right format',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  }
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { notFound, errorHandler }
