/**
 * Created by Srinivasa Rao A on 29/08/2021
 * @param {API request object} req
 * @param {API response object} res
 * @param {controller to next API handler} next
 */

const resHandler = function (req, res, next) {
  const oldSend = res.json;
  res.json = function (data) {
    const args = new Array();
    const response = {};
    response.code = arguments[0];
    response.msg = arguments[1];
    response.errors = arguments[2] ? arguments[2] : [];
    args[0] = response;
    oldSend.apply(res, args);
  };
  next();
};

module.exports = resHandler;
