module.exports = (backInStockErrorObject) => {
  if (!backInStockErrorObject) {
    return null
  }

  if (typeof backInStockErrorObject === 'string') {
    return backInStockErrorObject
  }

  const errorValues = Object.values(backInStockErrorObject)
  return [].concat(...errorValues).join(' ')
}
