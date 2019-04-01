const ERROR_CODE = 'EINVALIDBACKINSTOCK'

/**
 * Use this class for errors that happen in the pipeline
 * or passing information around the extension and between steps
 *
 * @param {string} message Error message
 * @default An extension error occurred.
 */
class InvalidBackInStockRequestError extends Error {
  /**
   * Constructor
   * @param {string} message Error message
   */
  constructor (message) {
    super(message !== '' && typeof message === 'string'
      ? message
      : 'An error occurred when requesting back in stock notification.')
    this.code = ERROR_CODE
  }
}

module.exports = InvalidBackInStockRequestError
