//import express from 'express';
//import { createCause } from '../controllers/cause.controller';
//const router = express.Router();
//router.post('/causes', createCause);
//export default router;

 const { authJwt } = require("../middlewares");
 const controller = require("../controllers/cause.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/causes", controller.createCause);
};