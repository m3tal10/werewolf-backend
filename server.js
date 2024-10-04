const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Unhandled rejection! Shutting Down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.MONGODB_CONNECTION_STRING.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD,
);

mongoose.connect(DB).then((con) => console.log('DB connection successful...'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection! Shutting Down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED... Shutting down...');
  server.close(() => {
    console.log('Process terminated...');
  });
});

//   "headers": [
//     {
//       "source": "/(.*)",
//       "headers": [
//         { "key": "Access-Control-Allow-Credentials", "value": "true" },
//         { "key": "Access-Control-Allow-Origin", "value": "*" },
//         {
//           "key": "Access-Control-Allow-Methods",
//           "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
//         },
//         {
//           "key": "Access-Control-Allow-Headers",
//           "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//         }
//       ]
//     }
//   ]
