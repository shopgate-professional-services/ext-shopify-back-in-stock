export default (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.warn(`parseJson helper was passed a bad parameter error message: ${e.message}`);
    return null;
  }
};
