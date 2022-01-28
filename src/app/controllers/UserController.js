import * as Yup from 'yup';
// import { Op } from "sequelize";
import User from '../models/User';

class UserController {
  // Method insert new record
  async store(req, res) {
    // Validation informations
    const schema = Yup.object().shape({
      name: Yup.string().required().max(100),
      email: Yup.string().required().max(50).email(),
      phone: Yup.string().max(20),
      password: Yup.string().required().min(8).max(15),
    });

    // Verify validation datas
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados!' });
    }

    // Verify if user exist
    const UserExists = await User.findOne({
      attributes: ['id_user'],
      where: {
        email: req.body.email,
      },
    });

    // Check if alredy record
    if (UserExists) {
      return res.status(400).json({ error: 'Usuário já existe!' });
    }

    // Create user if all is correct
    const { id_user, name, email } = await User.create(req.body);
    return res.json({ id_user, name, email });
  }

  // Method show all records
  async index(req, res) {
    // Pagination
    const { page = 1 } = req.query;

    const users = await User.findAll({
      // Registers per page
      limit: 10,
      offset: (page - 1) * 10,
      // Order show registers
      order: ['name'],
      attributes: ['id_user', 'name', 'email', 'phone', 'user_role', 'active'],
    });
    return res.json(users);
  }

  // Method show a aspecific record
  async details(req, res) {
    const user = await User.findOne({
      where: { id_user: req.params.id_user },
      attributes: ['id_user', 'name', 'email', 'phone', 'user_role', 'active'],
    });

    // Verify if there is the record and send message if not
    if (!user) {
      return res.status(400).json({ error: 'Usuário não existe!' });
    }

    // Return request record
    return res.json(user);
  }

  // Update method
  async update(req, res) {
    // Validation informations
    const schema = Yup.object().shape({
      name: Yup.string().max(100),
      email: Yup.string().max(50).email(),
      phone: Yup.string().max(20),
      oldPassword: Yup.string(),
      password: Yup.string()
        .min(8)
        .max(15)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .min(8)
        .max(15)
        .when('password', (password, field) =>
          password ? field.required().oneOf(['password']) : field
        ),
    });

    // Verify validation datas
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados!' });
    }

    // Receive email to form
    const { email, oldPassword } = req.body;

    // Looking for user datas
    const user = await User.findByPk(req.idUser);

    // Check email update and this new email isn't duplicate email in database
    if (email && email !== user.email) {
      const emailExist = await User.findOne({
        where: { email: req.body.email },
      });

      if (emailExist) {
        return res.status(400).json({
          error: 'Email alredy exist!',
        });
      }
    }

    // Validation password change
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Senha não confere!' });
    }

    // The update is being done through the token value
    const { id_user, name, phone } = await user.update(req.body);

    return res.json({
      id_user,
      name,
      email,
      phone,
    });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id_user);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não existe!' });
    }

    await user.destroy(req.params.id_user);

    return res.json({ message: 'Usuario excluído com sucesso!' });
  }
}

export default new UserController();
