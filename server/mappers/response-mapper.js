/**
 * Created by Srinivasa Rao A on 06/06/2020
*/
const resMapper = ({ userId, firstName, lastName, email, lastUpdate, createdDate, imageUrl, _id }, userImageUrl) => {
  return {
    _id,
    userId,
    firstName,
    lastName,
    email,
    lastName,
    createdDate,
    imageUrl: userImageUrl
  };
};

module.exports = resMapper;
