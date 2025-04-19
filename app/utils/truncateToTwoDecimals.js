const truncateToTwoDecimals = (num) => {
  return Math.trunc(num * 100) / 100
}

export default truncateToTwoDecimals
