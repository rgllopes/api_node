import * as Yup from 'yup';
// import { Op } from "sequelize";
import Category from '../models/Category';
import User from '../models/User';
// import User from "../models/User";

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    // Verify validation datas
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados!' });
    }

    req.body.id_user = req.idUser;
    const { id_category, description } = await Category.create(req.body);
    return res.json({
      id_category,
      description,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const categories = await Category.findAll({
      order: ['id_user'],
      attributes: ['id_category', 'description'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    if (!categories) {
      return res.status(400).json({ error: 'Lista de categorias esta vazia!' });
    }

    return res.json(categories);
  }

  async details(req, res) {
    const category = await Category.findOne({
      where: { id_category: req.params.id_category },
      attributes: ['id_category', 'description'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id_user', 'name'],
        },
      ],
    });

    if (!category) {
      return res.status(400).json({ error: 'Categoria não existe!' });
    }

    return res.json(category);
  }
}

export default new CategoryController();
