import { Sequelize, Model, DataTypes } from 'sequelize';
import configs from '../config/config';

const config = configs[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
