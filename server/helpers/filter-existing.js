
const filterExisting = (newElements, existing) => {
  let common, fresh;

  try {
    fresh = newElements.filter(ele => {
      for (let i = 0; i < existing.length; i++) {
        if (ele.view_name == existing[i].dataSetId) {
          return false;
        }
      }
      return true;
    });
    common = newElements.filter(ele => {
      for (let i = 0; i < existing.length; i++) {
        if (ele.view_name == existing[i].dataSetId) {
          return true;
        }
      }
      return false;
    });
  } catch (error) {

  }

  return {
    common,
    fresh
  };
};

module.exports = filterExisting;
