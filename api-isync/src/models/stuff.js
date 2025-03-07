import { DataTypes } from 'sequelize';
import db from '../config/db.config.js';
import { Box } from './box.js'; // Import Boxes model

export const Stuff = db.define('Stuff', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING(36),
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  merk: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  detail: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  img_url: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  boxId: { // Foreign Key for Boxes
    type: DataTypes.STRING(36),
    allowNull: false,
    references: {
      model: 'Box', // Table name
      key: 'id',
    },
    onDelete: 'CASCADE',
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
});

// Define Relationships
Box.hasMany(Stuff, { foreignKey: 'boxId', as: 'stuff' });
Stuff.belongsTo(Box, { foreignKey: 'boxId', as: 'box' });
