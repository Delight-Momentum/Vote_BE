function convertToKoreanTime(prevDate) {
  const offset = new Date().getTimezoneOffset() * 60000;
  return new Date(prevDate.getTime() - offset);
}

module.exports = {
  convertToKoreanTime,
};
