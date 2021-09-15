const { Router } = require('express');
const Article = require('../services/article');
const asyncHandler = require('express-async-handler');
const requireLoggedIn = require('../middlewares/requireLoggedIn')

const router = new Router();

router.use(requireLoggedIn);
const tam = 'Article.findByHost';
router.get('/',asyncHandler(async function(req,res){
    const vnexpress = await Article.findByHost('vnexpress.net');
    const thanhnien = await Article.findByHost('thanhnien.vn');
    const tuoitre = await Article.findByHost('tuoitre.vn');
    res.render('article',{ vnexpress,thanhnien,tuoitre });
}));
router.get('/covid19',asyncHandler(async function(req,res){
    const vnexpress = await Article.findByCovid_19('vnexpress.net');
    const thanhnien = await Article.findByCovid_19('thanhnien.vn');
    const tuoitre = await Article.findByCovid_19('tuoitre.vn');
    res.render('article',{ vnexpress,thanhnien,tuoitre });
}));

module.exports=router;