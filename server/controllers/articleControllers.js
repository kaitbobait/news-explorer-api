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

function createArticle(req, res, next) {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  return Articles.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      if (!article) {
        throw new RequestError('Invalid data');
      }
      res.status(200).send(article);
    })
    .catch(next);
}

function deleteArticle(req, res, next) {
  return Articles.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      if (article) {
        res.send({ data: article });
      } else {
        throw new NotFoundError('Article not found with ID');
      }
    })
    .catch(next);
}

module.exports = { getArticles, createArticle, deleteArticle };
