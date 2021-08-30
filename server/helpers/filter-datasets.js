
const filterDatasets = function (data, category) {
  let filteredElem = [];
  if (data && data.length > 0) {
    filteredElem = data.filter(ele => ele.category == category.category);
    return filteredElem;
  }
};

module.exports = filterDatasets;
