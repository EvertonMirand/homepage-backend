import * as yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro ao validar dados, verifique novamente.' });
    }

    const userExistis = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExistis) {
      return res.status(400).json({
        error: 'Usuario já existe.',
      });
    }
    const user = await User.create(req.body);
    const { id, name, email } = user;

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
