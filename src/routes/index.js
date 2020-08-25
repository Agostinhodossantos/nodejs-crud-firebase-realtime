const { Router} = require('express');
const router = Router();
const admin = require('firebase-admin');

//Firebase initializeApp
//https://www.youtube.com/watch?v=b6KJ7FSMifw
var serviceAccount = require("../../apptraining-4e270-firebase-adminsdk-ezwla-ccab79d1f9.json");

admin.initializeApp({
  
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://apptraining-4e270.firebaseio.com/'
});

const db = admin.database();

router.get('/' , (req , res)=>{
    db.ref('contacts').once('value' , (snapshot) => {
       const data = snapshot.val();
       res.render('index', {contacts: data });
    });
   
});

router.post('/new-contact', (req , res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    };
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/delete-contact/:id' , (req , res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});

module.exports = router;