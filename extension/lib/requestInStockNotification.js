/**
 * Do request to back in stock api
 * @param {PipelineContext} context
 * @param {Object} input
 * @returns {Promise<Object>}
 */
module.exports = async (context, input) => {
  const { email, productNumber, variantNumber } = input
  if (!email) {
    throw new Error('Please provide a valid email address')
  }

  if (!productNumber) {
    throw new Error('Product number is missing ')
  }

  const { backInStockAPIUrl, backInStockShopName } = context.config || {}

  if (!backInStockAPIUrl || !backInStockShopName) {
    throw new Error('API url or shop name not set')
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
    throw new Error(JSON.stringify(errors))
  }

  return { message, status }
}
