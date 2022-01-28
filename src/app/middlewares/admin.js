import { Op } from 'sequelize';
import User from '../models/User';

export default async (req, res, next) => {
  const user_role = await User.findOne({
    where: {
      [Op.and]: {
        id_user: req.idUser,
        user_role: 1,
      },
    },
  });
  if (!user_role) {
    return res
      .status(401)
      .json({ error: 'Somente administradores podem acessar!' });
  }
  return next();
};
