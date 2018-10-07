const express=require('express');
const Users=require('../controllers/index');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

//JSdoc comments used by swagger to generate swagger ui

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - login
 *     description: Logs in arbitary user though sending username and password (even if empty) is compulsory
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: credential
 *         description: 
 *         in: body
 *         required: true
 *         schema:
 *          properties:
 *           username:
 *              type: string
 *           password:
 *              type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: send username and password
 * /apply_patch:
 *   post:
 *     tags:
 *       - apply patch to a json
 *     description: send two jsons, one document and the other the patch json to be applied on document. User must be logged in to use this route.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: documents
 *         description: 
 *         in: body
 *         required: true
 *         schema:
 *          properties:
 *           doc:
 *              type: object
 *           patch:
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      op:
 *                          type: string
 *                      path:
 *                          type: string
 *                      value:
 *                          type: string
 *       - name: Authorization
 *         description: set the authorization header here as 'bearer token' ( note the space between the word bearer and the token)
 *         in: header
 *         required: true
 *         type : string
 *     responses:
 *       200:
 *         description: successfully patched the json object
 *       401:
 *         description: unauthorized user
 * /thumbnail:
 *   post:
 *     tags:
 *       - send a url of a remote image to resize it to 50*50 pixels.
 *     description: send a url of a remote image to resize it to 50*50 pixels. User must be logged in.
 *     produces:
 *       - image/*
 *     parameters:
 *       - name: url
 *         description: 
 *         in: body
 *         required: true
 *         schema:
 *          properties:
 *           url:
 *              type: string
 *       - name: Authorization
 *         description: set the authorization header here as 'bearer token' ( note the space between the word bearer and the token)
 *         in: header
 *         required: true
 *         type : string
 *     responses:
 *       200:
 *         description: image found.
 *       500:
 *         description: could not retrieve image
 *       400:
 *         description: unauthorized user
 */

// routes are of the form router.method(route,middleware,controller) 
router.post('/login', checkAuth.check_field, Users.login);
router.post('/apply_patch',checkAuth.verify, Users.apply_patch);
router.post('/thumbnail',checkAuth.verify, Users.resize_thumbnail);


module.exports = router;
