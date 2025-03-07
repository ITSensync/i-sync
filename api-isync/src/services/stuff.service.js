// eslint-disable-next-line import/no-unresolved
import httpStatus from 'http-status';
import { Stuff } from '../models/stuff.js';
import Response from '../utils/Response.js';

async function getAll() {
  const stuffData = await Stuff.findAll({
    order: [
      ['createdAt', 'asc']
    ]
  });

  if (!stuffData) {
    throw new Response.ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'GET STUFF FAILED')
  }

  return new Response.ApiSuccess(httpStatus.OK, 'GET STUFF SUCCESS', stuffData);
}

async function getById(stuffId) {
  const stuffData = await Stuff.findByPk(stuffId)
  if (!stuffData) {
    throw new Response.ApiError(httpStatus.NOT_FOUND, 'STUFF NOT FOUND')
  }

  return new Response.ApiSuccess(httpStatus.OK, 'GET STUFF SUCESS', stuffData)
}

async function create(body) {
  try {
    const createdStuff = await Stuff.create(body)
    return new Response.ApiSuccess(httpStatus.CREATED, 'CREATE STUFF SUCCESS', createdStuff)
  } catch (error) {
    throw new Response.ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
  }
}

async function update(stuffId, updateBody) {
  const updatedStuff = await Stuff.findByPk(stuffId);

  if (!updatedStuff) {
    throw new Response.ApiError(httpStatus.NOT_FOUND, 'Stuff NOT FOUND')
  }

  Object.assign(updatedStuff, updateBody)
  await updatedStuff.save();

  return new Response.ApiSuccess(httpStatus.CREATED, 'UPDATE STUFF SUCCESS', updatedStuff)
}

async function remove(stuffId) {
  const deletedStuff = await Stuff.findByPk(stuffId);

  if (!deletedStuff) {
    throw new Response.ApiError(httpStatus.NOT_FOUND, 'STUFF NOT FOUND')
  }

  await deletedStuff.destroy()
  return new Response.ApiSuccess(httpStatus.OK, 'DELETE STUFF SUCCESS')
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
