const express = require('express');
const { Page } = require('../models');
const addPage = require('../views/addPage');
const main = require('../views/main');
const wikipage = require('../views/wikipage');
const wikiRouter= express.Router();

wikiRouter.get ('/',  async (req,res,next)=>{
  try{
    const allPages = await Page.findAll();
    //console.log ('allPages.page.dataValues', allPages[0].dataValues);
    res.send(main(allPages))
  } catch(error) {
    next(error)
  }
});

wikiRouter.post ('/', async (req,res,next)=>{
  try {
    const page = await Page.create ({
      title: req.body.title,
      content: req.body.content
    });
    res.redirect(`/wiki/${page.slug}`)
  }catch(error){
    next(error)
  } 
});

wikiRouter.get ('/add',(req,res,next)=>{
  res.send(addPage())
});

wikiRouter.get ('/:slug', async (req,res,next)=>{
  //res.send (`hit dynamic route at ${req.params.slug}`)
  const page = await Page.findOne({
    where: {slug: req.params.slug}
  } )
    res.send(wikipage(page.dataValues))
  
});


module.exports =wikiRouter;