// eslint-disable-next-line import/no-unresolved
import httpStatus from 'http-status';
import { Box } from '../models/box.js';
import Response from '../utils/Response.js';
import { Stuff } from '../models/stuff.js';

async function getAll() {
  const boxData = await Box.findAll({
    attributes: ['id', 'name', 'number', 'color'],
    order: [
      ['createdAt', 'asc']
    ]
  });

  if (!boxData) {
    throw new Response.ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'GET BOX FAILED')
  }

  return new Response.ApiSuccess(httpStatus.OK, 'GET BOX SUCCESS', boxData);
}

async function getById(boxId) {
  const boxData = await Box.findByPk(boxId)
  if (!boxData) {
    throw new Response.ApiError(httpStatus.NOT_FOUND, 'BOX NOT FOUND')
  }

  return new Response.ApiSuccess(httpStatus.OK, 'GET BOX SUCESS', boxData)
}

async function getByIdWithPopulate(boxId) {
  const boxData = await Box.findOne({
    where: {
      id: boxId,
    },
    include: {
      model: Stuff,
      as: 'stuff',
    }
  })
  if (!boxData) {
    throw new Response.ApiError(httpStatus.NOT_FOUND, 'BOX NOT FOUND')
  }

  return new Response.ApiSuccess(httpStatus.OK, 'GET BOX SUCESS', boxData)
}

async function create(body) {
  try {
    const createdBox = await Box.create(body)
    return new Response.ApiSuccess(httpStatus.CREATED, 'CREATE BOX SUCCESS', createdBox)
  } catch (error) {
    throw new Response.ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
  }
}

async function update(boxId, updateBody) {
  const updatedBox = await Box.findByPk(boxId);

  if (!updatedBox) {
    throw new Response.ApiError(httpStatus.NOT_FOUND, 'BOX NOT FOUND')
  }

  Object.assign(updatedBox, updateBody)
  await updatedBox.save();

  return new Response.ApiSuccess(httpStatus.CREATED, 'UPDATE BOX SUCCESS', updatedBox)
}

async function remove(boxId) {
  const deletedBox = await Box.findByPk(boxId);

  if (!deletedBox) {
    throw new Response.ApiError(httpStatus.NOT_FOUND, 'BOX NOT FOUND')
  }

  await deletedBox.destroy()
  return new Response.ApiSuccess(httpStatus.OK, 'DELETE BOX SUCCESS')
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  getByIdWithPopulate,
};
