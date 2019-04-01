const assert = require('assert')
const sinon = require('sinon')
const { describe, it } = require('mocha')
const step = require('../../../lib/requestInStockNotification')

describe('requestInStockNotification', () => {
  const mockRequestResponse = { message: 'some message', status: 'ok' };
  const mockRequest = () => (
    new Promise((resolve) => { resolve({ ...mockRequestResponse }) })
  )
  const config = {
    backInStockAPIUrl: 'https://app.backinstock.org/stock_notification/create.json',
    backInStockShopName: 'merlins-magnificent-magic-shop.myshopify.com'
  }
  const mockRequestSpy = sinon.spy(mockRequest)
  const context = {
    tracedRequest: () => mockRequestSpy,
    config
  }
  const email = 'someone@someplace.com'
  const productNumber = 'testProduct'
  const variantNumber = '123'
  const mockInput = { email, productNumber, variantNumber }

  it('It should get notification', async () => {
    const mockRequestOptions = {
      url: config.backInStockAPIUrl,
      qs: {
        shop: config.backInStockShopName,
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
    const response = await step(context, mockInput)
    assert(mockRequestSpy.withArgs(mockRequestOptions).calledOnce)
    assert.deepStrictEqual(response, mockRequestResponse)
  })

  it('should get error due to missing email', async () => {
    let testStandIn = () => {}
    try {
      await step(context, { productNumber, variantNumber })
    } catch (error) {
      testStandIn = () => { throw error }
    } finally {
      assert.throws(testStandIn, error => error.message === 'Please provide a valid email address')
    }
  })

  it('should get error due to missing productNumber', async () => {
    let testStandIn = () => {}
    try {
      await step(context, { email, variantNumber })
    } catch (error) {
      testStandIn = () => { throw error }
    } finally {
      assert.throws(testStandIn, error => error.message === 'Product number is missing')
    }
  })

  it('should get error due to missing variantNumber', async () => {
    let testStandIn = () => {}
    try {
      await step(context, { email, productNumber })
    } catch (error) {
      testStandIn = () => { throw error }
    } finally {
      assert.throws(testStandIn, error => error.message === 'variant number is missing')
    }
  })

  it('should get error due to missing configuration', async () => {
    const lackingContext = {
      config: {}
    }
    let testStandIn = () => {}
    try {
      await step(lackingContext, mockInput)
    } catch (error) {
      testStandIn = () => { throw error }
    } finally {
      assert.throws(testStandIn, error => error.message === 'API url or shop name not set')
    }
  })

  it('should return error because api returns error', async () => {
    const apiErrorMessage = 'You have already registered for a notification for that item.'
    const errors = {
      email: [apiErrorMessage]
    }

    const fakeRequestWithError = () => (
      new Promise((resolve) => {
        resolve({ status: 'error', errors })
      })
    )

    const contextWithErrorClient = {
      tracedRequest: () => fakeRequestWithError,
      config
    }

    let testStandIn = () => {}
    try {
      await step(contextWithErrorClient, mockInput)
    } catch (error) {
      testStandIn = () => { throw error }
    } finally {
      assert.throws(testStandIn, error => error.message === apiErrorMessage)
    }
  })
})
