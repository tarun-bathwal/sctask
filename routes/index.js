// import express from 'express';
// import Users from '../controllers/index';
const express=require('express');
const Users=require('../controllers/index');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express' });
});
router.post('/login', Users.login);
router.post('/apply_patch',checkAuth.verify, Users.apply_patch);
router.post('/thumbnail',checkAuth.verify, Users.resize_thumbnail);

module.exports = router;
