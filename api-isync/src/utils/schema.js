// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi';

const createBook = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().required(),
});

const updateBook = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  year: Joi.number(),
});

export default {
  '/create-book': createBook,
  '/update-book': updateBook,
};
