// import mongoose from 'mongoose';
// import Cause from '../models/cause';
// // create new cause
// export function createCause(req, res) {
//   const cause = new Cause({
//     _id: mongoose.Types.ObjectId(),
//     title: req.body.title,
//     description: req.body.description,
//   });
//   return cause
//     .save()
//     .then((newCause) => {
//       return res.status(201).json({
//         success: true,
//         message: 'New cause created successfully',
//         Cause: newCause,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         success: false,
//         message: 'Server error. Please try again.',
//         error: error.message,
//       });
//     });
// }  

// exports.createCause = (req, res) => {
//     const cause = new Cause({
//         _id: mongoose.Types.ObjectId(),
//         title: req.body.title,
//         description: req.body.description,
//       });
//       return cause
//         .save()
//         .then((newCause) => {
//           return res.status(201).json({
//             success: true,
//             message: 'New cause created successfully',
//             Cause: newCause,
//           });
//         })
//         .catch((error) => {
//           res.status(500).json({
//             success: false,
//             message: 'Server error. Please try again.',
//             error: error.message,
//           });
//         });
//   };



//const config = require("../config/auth.config");
const db = require("../models");
const { cause: Cause} = db;

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

exports.createCause = (req, res) => {
  const cause = new Cause({
    title: req.body.title,
    description: req.body.description,
  });

  cause.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Cause was registered successfully!" });
  });

//   cause.save((err, cause) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//   });
};