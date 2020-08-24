const { Router} = require('express');
const router = Router();

router.get('/' , (req , res)=>{
    console.log('index works');
    res.send('received');
});

module.exports = router;