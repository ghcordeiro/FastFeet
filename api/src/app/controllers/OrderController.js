import * as Yup from 'yup';

import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    const order = await Order.findAll();

    return res.status(200).json(order);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { product, deliveryman_id, recipient_id } = await Order.create(
      req.body
    );

    return res.json({
      product,
      deliveryman_id,
      recipient_id,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'id is required.' });
    }

    const orderExists = await Order.findOne({
      where: { id },
    });

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not exists.' });
    }

    await Order.update(req.body, { where: { id } });

    const order = await Order.findOne({
      where: { id },
    });

    return res.status(200).json(order);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'id is required.' });
    }

    const orderExists = await Order.findOne({
      where: { id },
    });

    if (!orderExists) {
      return res.status(400).json({ error: 'Order not exists.' });
    }

    await Order.destroy({ where: { id } });

    return res.status(200).json({ message: 'Order has been deleted' });
  }
}

export default new OrderController();
