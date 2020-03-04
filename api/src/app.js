import express from 'express';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use((req, res) => {
      res.status(200).json({ message: 'Teste' });
    });
  }
}

export default new App().server;
