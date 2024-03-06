class CustomError extends Error {
  constructor(message, statusCode, errorData = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorData = errorData;
  }

  toResponseObject() {
    return {
      error: {
        message: this.message,
        status: 'error',
        statusCode: this.statusCode,
        data: this.errorData,
      },
    };
  }
}

export default CustomError;
