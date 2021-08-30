const libResMapper = require('./library-response-mapper');
const resMapper = require('./response-mapper');
const dataSetInfoResMapper = require('./dataset-info-mapper');

module.exports = {
  responseMapper: resMapper,
  dataSetInfoResMapper,
  libResMapper
};
