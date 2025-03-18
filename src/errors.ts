export class TrutoError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public statusText: string,
    public response?: Response,
    public data?: unknown
  ) {
    super(message)
    this.name = 'TrutoError'
  }
}

export class TrutoTimeoutError extends TrutoError {
  constructor(message = 'Request timed out') {
    super(
      message,
      408, // Request Timeout
      'Request Timeout'
    )
    this.name = 'TrutoTimeoutError'
  }
}
