
const sortCircleList = function (data) {
  data.sort((a, b) => {
    const aExperts = `${a.custodian},${a.reldExp}`.split(',');
    const bExperts = `${b.custodian},${b.reldExp}`.split(',');
    return aExperts.length < bExperts.length
      ? 1
      : aExperts.length > bExperts.length ? -1 : 0;
  });
  return data.slice(0, 2);
};

module.exports = sortCircleList;
