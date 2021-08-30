
const dataSetInfoResMapper = function (dataSetInfo) {
  if (dataSetInfo instanceof Array) {
    return dataSetInfo.map(({ _id: { _id, dataSetId, dataSetName, lastUpdate, createdDate }, avgRating }) => {
      return {
        _id,
        dataSetId,
        dataSetName,
        lastUpdate,
        createdDate,
        avgRating
      };
    });
  }
  return dataSetInfo;
};

module.exports = dataSetInfoResMapper;
