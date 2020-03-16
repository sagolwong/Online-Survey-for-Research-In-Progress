const router = require('express').Router();
let Prototype = require('../models/prototype.model');

router.route('/').get((req, res) => {
    Prototype.find()
        .then(prototypes => res.json(prototypes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
    const userId = req.body.userId;
    const nameSurvey = req.body.nameSurvey;
    const description = req.body.description;
    const shareTo = req.body.shareTo;
    const wantName = req.body.wantName;
    const haveGroup = req.body.haveGroup;
    const frequency = req.body.frequency;
    const doOnce = req.body.doOnce;
    const openAndCloseTimes = req.body.openAndCloseTimes;
    const builtIns = req.body.builtIns;
    const data = req.body.data;

    const newPrototype = new Prototype({
        userId,
        nameSurvey,
        description,
        shareTo,
        wantName,
        haveGroup,
        frequency,
        doOnce,
        openAndCloseTimes,
        builtIns,
        data
    });

    newPrototype.save()
        .then(() => res.json('Prototype create!'))
        .catch(err => res.json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Prototype.find({ userId: req.params.id })
        .then(prototypes => res.json(prototypes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/:id').get((req, res) => {
    Prototype.findById( req.params.id )
        .then(prototypes => res.json(prototypes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Prototype.findByIdAndDelete(req.params.id)
        .then(() => res.json('Prototype deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
    Prototype.findById(req.params.id)
        .then(prototype => {
            prototype.nameSurvey = req.body.nameSurvey;
            prototype.description = req.body.description;
            prototype.shareTo = req.body.shareTo;
            prototype.wantName = req.body.wantName;
            prototype.haveGroup = req.body.haveGroup;
            prototype.frequency = req.body.frequency;
            prototype.doOnce = req.body.doOnce;
            prototype.openAndCloseTimes = req.body.openAndCloseTimes;
            prototype.builtIns = req.body.builtIns;
            prototype.data = req.body.data;


            prototype.save()
                .then(() => res.json('Prototype update!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;