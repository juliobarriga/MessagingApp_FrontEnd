  //Install express server
  const express = require('express');
  const path = require('path');
  const app = express();

  // Serve only the static files form the dist directory
  app.use(express.static(__dirname + '/dist/messaging-app'));
  app.get('/*', function(req,res) {
     res.sendFile(path.join(__dirname+'/dist/messaging-app/index.html'));
  });

  // Start the app by listening on the default Heroku port
  app.listen(process.env.PORT || 8080);

// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     next();
// }
// const express = require('express');
// // const path = require('path');
// const cors = require('cors');
// const app = express();
// // app.use(requireHTTPS);

// const whitelist = ['https://messagingapp--api.herokuapp.com/']; // list of allow domain

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin) {
//             return callback(null, true);
//         }

//         if (whitelist.indexOf(origin) === -1) {
//             var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     }
// }

// app.use(cors(corsOptions));

// app.use(express.static('./dist/messaging-app'));

// app.get('/*', function(req, res) {
//     res.sendFile('index.html', {root: 'dist/messaging-app/'}
//     );
// });

// app.listen(process.env.PORT || 8080);

// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static('./dist/messaging-app'));

// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/messaging-app/'}),
// );

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);