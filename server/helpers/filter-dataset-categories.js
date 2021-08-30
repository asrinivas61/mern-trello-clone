
const filterdataSetCategories = function (data) {
  const resArr = [];
  data.forEach(function (item) {
    const i = resArr.findIndex(x => x.category == item.category);
    if (i <= -1) {
      resArr.push({
        viewName: item.view_name,
        category: item.category,
        tags: item.tagName
      });
    }
  });
  return resArr;
};

module.exports = filterdataSetCategories;
