// eslint-disable-next-line import/no-extraneous-dependencies
import DataTypes from 'sequelize';
import db from '../config/db.config.js';

export const Box = db.define('Box', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING(36),
    defaultValue: DataTypes.UUIDV4,
  },
  number: {
    allowNull: true,
    type: DataTypes.BIGINT,
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  color: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
  freezeTableName: true,
})