const express = require('express');
const { Page } = require('../models');
const addPage = require('../views/addPage');
const wikiRouter= express.Router();

wikiRouter.get ('/', (req,res,next)=>{
  res.send('WIKI PAGE')
});

wikiRouter.post ('/', async (req,res,next)=>{
  try {
   // res.json(req.body); 
    const page = await Page.create ({
      title: req.body.title,
      content: req.body.content
    });
    res.redirect('/')
  }catch(error){
    next(error)
  } 
});

wikiRouter.get ('/add',(req,res,next)=>{
  res.send(addPage())
});


// const slugCreator = (title)=>{
//   return title.replace(/\s+/g, '_').replace(/\W/g, '');
// }
module.exports =wikiRouter;