import * as Yup from 'yup';

import Recipients from '../models/Recipients';

class RecipientsController {
  async index(req, res) {
    const recipients = await Recipients.findAll();

    return res.status(200).json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;

    const recipients = await Recipients.findOne({ where: { name } });

    if (recipients) {
      return res.status(401).json({ error: 'Recipient alread exists' });
    }

    const recipient = await Recipients.create(req.body);

    return res.json(recipient);
  }
}

export default new RecipientsController();
