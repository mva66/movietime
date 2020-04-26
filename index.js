const path = require("path");
const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
mongoose = require("mongoose");
Models = require("./models.js");
cors = require("cors");
const app = express();
const Movies = Models.Movie;
const Users = Models.User;
const { check, validationResult } = require("express-validator");
// local connection
//mongoose.connect("mongodb://localhost:27017/myflixdb", {useNewUrlParser: true});
mongoose.connect(
  "mongodb+srv://mva66:Kidaan16@myflixdb-niqk6.mongodb.net/myFlixDB?retryWrites=true",
  { useNewUrlParser: true }
);

app.use(morgan("common"));
app.use(express.static("public"));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.use(bodyParser.json());
app.use(cors());

var auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

var allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:1234",
  "https://mehak-movieapi.herokuapp.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        var message =
          "The CORS policy for this application does not allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//list of all movies
app.get("/", function (req, res) {
  return res.status(400).send("Welcome to my Flix App");
});

app.get("/movies", passport.authenticate("jwt", { session: false }), function (
  req,
  res
) {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//get information about movie by title
app.get("/movies/:Title", function (req, res) {
  Movies.findOne({ Title: req.params.Title })
    .then(function (movies) {
      res.json(movies);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get data about director
app.get("/movies/director/:Name", function (req, res) {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(function (movies) {
      res.json(movies);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get data about genre by name
app.get("/movies/genres/:Name", function (req, res) {
  Movies.findOne({ "Genre.Name": req.params.Name })
    .then(function (movies) {
      res.json(movies.Genre);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get list of users
app.get("/users", passport.authenticate("jwt", { session: false }), function (
  req,
  res
) {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get a user by Username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOne({ Username: req.params.Username })
      .then(function (user) {
        res.json(user);
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Add new user
/* We’ll expect JSON in this format
{
 ID : Integer,
 Username : String,
 Password : String,
 Email : String,
 Birthday : Date
}*/

app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then(function (user) {
        if (user) {
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then(function (user) {
              res.status(201).json(user);
            })
            .catch(function (error) {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);
// delete user from the list by username
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then(function (user) {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Update user info by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  function (req, res) {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }, //this line makes sure that the updated document is returned
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// Add movie to favorites list
app.post(
  "/users/:Username/Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }, // This line makes sure that the updated document is returned
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

// delete movie from favorite list for user
app.delete(
  "/users/:Username/Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true },
      function (err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
  console.log("Listening on port 3000");
});

// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const Models = require("./models.js");
// var jwtSecret = "your_jwt_secret"; // This has to be the same key used in the JWTStrategy
// var jwt = require("jsonwebtoken");
// const passport = require("passport");
// require("./passport"); // Your local passport file
// const cors = require("cors");
// app.use(cors());
// const { check, validationResult } = require("express-validator");

// const Movies = Models.Movie;
// const Users = Models.User;
// // mongoose.connect("mongodb://localhost:27017/myFlixDB", {
// //   useNewUrlParser: true
// // });
// mongoose.connect(
//   "mongodb+srv://isendil:lidnesi1@cluster0-hqbcg.mongodb.net/myFlixDB?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//   }
// );

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(bodyParser.json());
// var auth = require("./auth")(app);
// app.use(function (err, req, res, next) {
//   // logic
// });
// app.use(morgan("common"));
// app.use(express.static("public"));
// app.use("/client", express.static(path.join(__dirname, "client", "dist")));
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// // GET requests
// app.get("/", function (req, res) {
//   var text = "Welcome to Pain Train ";
//   text += "url: " + req.url;
//   res.send(text);
// });
// app.get("/secreturl", function (req, res) {
//   var text = "This is a secret url with super top-secret content. ";
//   text += "url: " + req.url;
//   res.send(text);
// });
// app.get("/documentation.html");
// // app.get("/movies", function(req, res) {
// //   Movies.find().then(movies => res.json(movies));
// // });

// // Get all users
// app.get("/users", function (req, res) {
//   Users.find()
//     .then(function (users) {
//       res.status(201).json(users);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });
// app.get("/users/:Username", function (req, res) {
//   Users.findOne({ Username: req.params.Username })
//     .then(function (user) {
//       res.json(user);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });
// app.get("/index.html");
// app.get("/gundam.jpg");

// app.post(
//   "/users",
//   // Validation logic here for request
//   //you can either use a chain of methods like .not().isEmpty()
//   //which means "opposite of isEmpty" in plain english "is not empty"
//   //or use .isLength({min: 5}) which means
//   //minimum value of 5 characters are only allowed
//   [
//     check("Username", "Username is required").isLength({ min: 5 }),
//     // check(
//     //   "Username",
//     //   "Username contains non alphanumeric characters - not allowed."
//     // ).isAlphanumeric(),
//     check("Password", "Password is required").not().isEmpty(),
//     check("Email", "Email does not appear to be valid").isEmail(),
//   ],
//   (req, res) => {
//     // check the validation object for errors
//     var errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }

//     var hashedPassword = Users.hashPassword(req.body.Password);
//     Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested Username already exists
//       .then(function (user) {
//         if (user) {
//           //If the user is found, send a response that it already exists
//           return res.status(400).send(req.body.Username + " already exists");
//         } else {
//           Users.create({
//             Username: req.body.Username,
//             Password: hashedPassword,
//             Email: req.body.Email,
//             Birthday: req.body.Birthday,
//           })
//             .then(function (user) {
//               res.status(201).json(user);
//             })
//             .catch(function (error) {
//               console.error(error);
//               res.status(500).send("Error: " + error);
//             });
//         }
//       })
//       .catch(function (error) {
//         console.error(error);
//         res.status(500).send("Error: " + error);
//       });
//   }
// );

// app.put("/users/:Username", function (req, res) {
//   Users.findOneAndUpdate(
//     { Username: req.params.Username },
//     {
//       $set: {
//         Username: req.body.Username,
//         Password: req.body.Password,
//         Email: req.body.Email,
//         Birthday: req.body.Birthday,
//       },
//     },
//     { new: true }, // This line makes sure that the updated document is returned
//     function (err, updatedUser) {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error: " + err);
//       } else {
//         res.json(updatedUser);
//       }
//     }
//   );
// });

// app.delete("/users/:Username", function (req, res) {
//   Users.findOneAndRemove({ Username: req.params.Username })
//     .then(function (user) {
//       if (!user) {
//         res.status(400).send(req.params.Username + " was not found");
//       } else {
//         res.status(200).send(req.params.Username + " was deleted.");
//       }
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });
// app.post("/users/:Username/Movies/:MovieID", function (req, res) {
//   Users.findOneAndUpdate(
//     { Username: req.params.Username },
//     {
//       $push: { FavoriteMovies: req.params.MovieID },
//     },
//     { new: true }, // This line makes sure that the updated document is returned
//     function (err, updatedUser) {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error: " + err);
//       } else {
//         res.json(updatedUser);
//       }
//     }
//   );
// });

// // app.get("/movies", function(req, res) {
// //   Movies.find()
// //     .then(function(movies) {
// //       res.status(201).json(movies);
// //     })
// //     .catch(function(error) {
// //       console.error(error);
// //       res.status(500).send("Error: " + error);
// //     });
// // });
// app.get("/movies", passport.authenticate("jwt", { session: false }), function (
//   req,
//   res
// ) {
//   Movies.find()
//     .then(function (movies) {
//       res.status(201).json(movies);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// // listen for requests
// var port = process.env.PORT || 3000 || 1234;
// app.listen(port, "0.0.0.0", function () {
//   console.log("Listening on Port 3000");
// });
// //app.listen(8080, () => console.log("Your app is listening on port 8080."));
