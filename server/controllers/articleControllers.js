const Articles = require('../models/articles');
const RequestError = require('../errors/requestError');
const NotFoundError = require('../errors/notFoundError');

function getArticles(req, res, next) {
  return Articles.find({})
    .then((articles) => {
      if (articles) {
        return res.status(200).send(articles);
      }
      return Promise.reject(new NotFoundError('Articles not found'));
    })
    .catch(next);
}

module.exports = { getArticles };
