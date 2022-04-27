const router = require('express').Router()
const verify = require('./Verify')


router.get('/',verify,(req,res) =>{
    res.json({
        posts:{
            title:'text ',
            description:'I am Test a Privat post'
        }
    });
});



module.exports = router;