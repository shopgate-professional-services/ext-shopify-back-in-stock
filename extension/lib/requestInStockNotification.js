const InvalidBackInStockRequestError = require('../errors/InvalidBackInStockRequestError')
const parseBackInStockErrors = require('../helpers/parseBackInStockErrors')
const INFORMATIONAL_USER_ERRORS = [
  'You have already registered for a notification for that item.'
]

/**
 * Do request to back in stock api
 * @param {PipelineContext} context Connect context
 * @param {Object} input Connect input
 * @returns {Promise<Object>}
 */
module.exports = async (context, input) => {
  const { email, productNumber, variantNumber } = input
  if (!email) {
    throw new InvalidBackInStockRequestError('Please provide a valid email address')
  }

  if (!productNumber) {
    throw new InvalidBackInStockRequestError('Product number is missing')
  }

  if (!variantNumber) {
    throw new InvalidBackInStockRequestError('variant number is missing')
  }

  const { backInStockAPIUrl, backInStockShopName } = context.config || {}

  if (!backInStockAPIUrl || !backInStockShopName) {
    throw new InvalidBackInStockRequestError('API url or shop name not set')
  }

  const requestOptions = {
    url: backInStockAPIUrl,
    qs: {
      shop: backInStockShopName,
      notification: {
        email,
        product_no: productNumber,
        quantity_required: 1,
        accepts_marketing: false
      },
      variant: {
        variant_no: variantNumber
      }
    },
    json: true
  }

  const request = context.tracedRequest('in-stock-notification-extension', { log: true })

  const response = await request(requestOptions)
  const { message, status, errors } = response || {}
  const apiErrorMessage = parseBackInStockErrors(errors)

  // Throw error only when it is not an informational user error like 'already registered'
  if (errors && !INFORMATIONAL_USER_ERRORS.includes(apiErrorMessage)) {
    throw new InvalidBackInStockRequestError(apiErrorMessage)
  }

  // If there is a message there will not be an error message and vice versa
  return { message: message || apiErrorMessage, status }
}
