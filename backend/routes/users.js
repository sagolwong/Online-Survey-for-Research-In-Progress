const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/signup').post((req, res, next) => {
  if(!req.user){
    var user = new User(req.body);
    user.provider = 'local';

    user.save(function(err){
      if(err) return res.status(400).json('Error: ' + err);

      req.login(user, function(err){
        if(err) return next(err);
        return res.json('User create!');
      })
    })
  }
})*/

router.route('/create').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const role = "Responder";

  const newUser = new User({
      email,
      password,
      firstname,
      lastname,
      role
  });

  newUser.save()
    .then(() => res.json('User create!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/upgrade/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.gender = req.body.gender;
      user.age = Number(req.body.age);
      user.role = "Researcher";
      

      user.save()
        .then(() => res.json('User upgrade!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.recentProjects = req.body.recentProjects;
      user.recentOtherSurveys = req.body.recentOtherSurveys;
      

      user.save()
        .then(() => res.json('RecentProject&OtherSurvey update!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;