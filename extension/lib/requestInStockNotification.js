const InvalidBackInStockRequestError = require('../errors/InvalidBackInStockRequestError')
const parseBackInStockErrors = require('../helpers/parseBackInStockErrors')

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

  if (errors) {
    throw new InvalidBackInStockRequestError(parseBackInStockErrors(errors))
  }

  return { message, status }
}
