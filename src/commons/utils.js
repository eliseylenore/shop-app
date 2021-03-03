const getFormattedValue = (value= 0, digits=2) => parseFloat(value).toFixed(digits).replace(/\.0+$/, "");

export {
  getFormattedValue
}
