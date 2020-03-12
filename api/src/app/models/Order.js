import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        // recipient_id, //(referência ao destinatário);
        // deliveryman_id, // (referência ao entregador);
        // signature_id , //(referência à uma assinatura do destinatário, que será uma imagem);
        product: Sequelize.INTEGER, // (nome do produto a ser entregue);
        canceled_at: Sequelize.DATE, // (data de cancelamento, se cancelada);
        start_date: Sequelize.DATE, // (data de retirada do produto);
        end_date: Sequelize.DATE, // (data final da entrega);
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
    this.belongsTo(models.Recipients, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
  }
}

export default Order;
