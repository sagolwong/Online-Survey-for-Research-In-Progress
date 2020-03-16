const router = require('express').Router();
let onlineSurvey = require('../models/onlineSurvey.model');

router.route('/').get((req, res) => {
    onlineSurvey.find()
        .then(onlineSurveys => res.json(onlineSurveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
    const projectId = req.body.projectId;
    const sampleGroupId = req.body.sampleGroupId;
    const nameSurvey = req.body.nameSurvey;
    const description = req.body.description;
    const shareTo = req.body.shareTo;
    const wantName = req.body.wantName;
    const haveGroup = req.body.haveGroup;
    const names = req.body.names;
    const frequency = req.body.frequency;
    const doOnce = req.body.doOnce;
    const openAndCloseTimes = req.body.openAndCloseTimes;
    const qprocess = req.body.qprocess;
    const builtIns = req.body.builtIns;
    const data = req.body.data;
    const status = req.body.status;

    const newOnlineSurvey = new onlineSurvey({
        projectId,
        sampleGroupId,
        nameSurvey,
        description,
        shareTo,
        wantName,
        haveGroup,
        names,
        frequency,
        doOnce,
        openAndCloseTimes,
        qprocess,
        builtIns,
        data,
        status
    });

    newOnlineSurvey.save()
        .then(() => res.json('Survey create!'))
        .catch(err => res.json('Error: ' + err));
});

/*router.route('/:id').get((req, res) => {
    Survey.findById(req.params.id)
        .then(surveys => res.json(surveys))
        .catch(err => res.status(400).json('Error: ' + err));
});*/

router.route('/:id').get((req, res) => {
    onlineSurvey.find({ projectId: req.params.id })
        .then(onlineSurveys => res.json(onlineSurveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/:id').get((req, res) => {
    onlineSurvey.findById(req.params.id)
        .then(onlineSurveys => res.json(onlineSurveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/group/:id').get((req, res) => {
    onlineSurvey.find({ sampleGroupId: req.params.id })
        .then(onlineSurveys => res.json(onlineSurveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/:nameSurvey').get((req, res) => {
    onlineSurvey.find({ projectId: req.params.id, nameSurvey: req.params.nameSurvey })
        .then(onlineSurveys => res.json(onlineSurveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    onlineSurvey.findByIdAndDelete(req.params.id)
        .then(() => res.json('Survey deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
    onlineSurvey.findById(req.params.id)
        .then(survey => {
            survey.nameSample = req.body.nameSample;
            survey.nameSurvey = req.body.nameSurvey;
            survey.description = req.body.description;
            survey.shareTo = req.body.shareTo;
            survey.wantName = req.body.wantName;
            survey.haveGroup = req.body.haveGroup;
            survey.names = req.body.names;
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

router.route('/member/:id').post((req, res) => {
    onlineSurvey.findById(req.params.id)
        .then(survey => {
            survey.names = req.body.names;

            survey.save()
                .then(() => res.json('Survey update!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/editSurvey/:id').post((req, res) => {
    onlineSurvey.findById(req.params.id)
        .then(survey => {
            survey.nameSurvey = req.body.nameSurvey;
            survey.description = req.body.description;
            survey.shareTo = req.body.shareTo;
            survey.wantName = req.body.wantName;
            survey.haveGroup = req.body.haveGroup;
            survey.names = req.body.names;
            survey.frequency = req.body.frequency;
            survey.doOnce = req.body.doOnce;
            survey.openAndCloseTimes = req.body.openAndCloseTimes;
            survey.qprocess = req.body.qprocess;
            survey.data = req.body.data;
            survey.builtIns = req.body.builtIns;
            survey.status = req.body.status;


            survey.save()
                .then(() => res.json('Survey update!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;