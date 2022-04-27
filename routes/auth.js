const router = require("express").Router();
const UserModel = require("../model/UserModel");
const {
  registerValidation,
  loginValidation,
} = require("../validation/ValidateUser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {

    //validation checking 
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  //checking id email already exist 
    const ExistUser = await UserModel.findOne({email:req.body.email});
    if (ExistUser) return res.status(400).send('Email Already Exist');

    //hashing password 
    const extraNum = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,extraNum);

    ///creting a new user 
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const SavedUser = await user.save();
    res.send({user: user._id});
  } catch (err) {
    res.send(err);
  }
});


router.post('/login', async (req,res) =>{
    /// login validatoion
    const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  //checking id email is exist  or not 
    const user = await UserModel.findOne({email: req.body.email});
    if (!user) return res.status(400).send(`Email does't exist`);

    //password checking 
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if (!validPass) return res.status(400).send('Invalide Password');


    ///creating a web token 
    const token = jwt.sign({id:user._id},process.env.TOKEN_SECRATE);
    res.header('auth-token',token).send(token);

    
});

module.exports = router;
