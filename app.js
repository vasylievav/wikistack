const express = require('express');
const morgan = require('morgan');
const { db ,Page,User } =require ('./models');
const wikiRouter = require ('./routes/wiki');
const userRouter = require ('./routes/users'); 


const app =express();
const router = express.Router();
const PORT =3000;

app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.static("./static"));
app.use(express.json());
//app.use('/',router);

app.get ('/', (req,res,next)=>{
  res.redirect('/wiki')
});

app.use('/wiki',wikiRouter);
app.use('users', userRouter);

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  });

  const syncFunction =async function (){
  //  await db.sync({force: true});
    await db.sync();
    app.listen(PORT, ()=>{
     console.log(`Server is listening on port ${PORT}`)
   });
  }

  syncFunction();

  
router.get("/",(req,res)=>{
  res.send('<h1>Hello world</h1>')
})