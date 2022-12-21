const mongoose = require('mongoose');
const dotenv = require('dotenv');
/*
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
*/
dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('База данных подключена.'));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Сайт запущен http://localhost:4000`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  //console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
