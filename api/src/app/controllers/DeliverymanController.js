import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findAll();

    return res.status(200).json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists.' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'id is required.' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { id },
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not exists.' });
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await Deliveryman.update(req.body, { where: { id } });

    const deliveryman = await Deliveryman.findOne({
      where: { id },
    });

    return res.status(200).json(deliveryman);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'id is required.' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { id },
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not exists.' });
    }

    await Deliveryman.destroy({ where: { id } });

    return res.status(200).json({ message: 'Deliveryman has been deleted' });
  }
}

export default new DeliverymanController();
