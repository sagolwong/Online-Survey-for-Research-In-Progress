const router = require('express').Router();
let Survey = require('../models/survey.model');

router.route('/').get((req, res) => {
    Survey.find()
        .then(surveys => res.json(surveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
    const projectId = req.body.projectId;
    const sampleGroupId = req.body.sampleGroupId;
    const nameSurvey = req.body.nameSurvey;
    const description = req.body.description;
    const shareTo = req.body.shareTo;
    const wantName = req.body.wantName;
    const haveTwoGroup = req.body.haveTwoGroup;
    const names = req.body.names;
    const listNameExperiments = req.body.listNameExperiments;
    const listNameControls = req.body.listNameControls;
    const frequency = req.body.frequency;
    const doOnce = req.body.doOnce;
    const openAndCloseTimes = req.body.openAndCloseTimes;
    const qprocess = req.body.qprocess;
    const data = req.body.data;

    const newSurvey = new Survey({
        projectId,
        sampleGroupId,
        nameSurvey,
        description,
        shareTo,
        wantName,
        haveTwoGroup,
        names,
        listNameExperiments,
        listNameControls,
        frequency,
        doOnce,
        openAndCloseTimes,
        qprocess,
        data
    });

    newSurvey.save()
        .then(() => res.json('Survey create!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/:id').get((req, res) => {
    Survey.findById(req.params.id)
        .then(surveys => res.json(surveys))
        .catch(err => res.status(400).json('Error: ' + err));
});*/

router.route('/:id').get((req, res) => {
    Survey.find({ projectId: req.params.id })
        .then(surveys => res.json(surveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/:id').get((req, res) => {
    Survey.findById( req.params.id )
        .then(surveys => res.json(surveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/group/:id').get((req, res) => {
    Survey.find({ sampleGroupId: req.params.id })
        .then(surveys => res.json(surveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Survey.findByIdAndDelete(req.params.id)
        .then(() => res.json('Survey deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
    Survey.findById(req.params.id)
        .then(survey => {
            survey.nameSample = req.body.nameSample;
            survey.nameSurvey = req.body.nameSurvey;
            survey.description = req.body.description;
            survey.shareTo = req.body.shareTo;
            survey.wantName = req.body.wantName;
            survey.haveTwoGroup = req.body.haveTwoGroup;
            survey.names = req.body.names;
            survey.listNameExperiments = req.body.listNameExperiments;
            survey.listNameControls = req.body.listNameControls;
            survey.frequency = req.body.frequency;
            survey.doOnce = req.body.doOnce;
            survey.openAndCloseTimes = req.body.openAndCloseTimes;
            survey.qprocess = req.body.qprocess;
            survey.data = req.body.data;


            survey.save()
                .then(() => res.json('Survey update!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;