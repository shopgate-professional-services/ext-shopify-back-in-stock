module.exports = (backInStockErrorObject) => {
  if (typeof backInStockErrorObject === 'string') {
    return backInStockErrorObject
  }
  const errorValues = Object.values(backInStockErrorObject)
  return [].concat.apply([], errorValues).join(' ')
}
