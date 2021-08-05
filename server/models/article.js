const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    link: '',
    validate: {
      // regex: /https?:\/\/[www.]?[-a-z0-9]{2,24}[/-a-z0-9_.#@]+/i
      validator(v) {
        const regex = /^https?:\/\/(www\.)?\S+/gi;
        return regex.test(v);
      },
      message: 'Please enter valid url',
    },
  },
  image: {
    type: String,
    required: true,
    link: '',
    validate: {
      // regex: /https?:\/\/[www.]?[-a-z0-9]{2,24}[/-a-z0-9_.#@]+/i
      validator(v) {
        const regex = /^https?:\/\/(www\.)?\S+/gi;
        return regex.test(v);
      },
      message: 'Please enter valid url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user', // card author's model?,
  },
});

module.exports = mongoose.model('article', articleSchema);
