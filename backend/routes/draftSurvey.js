const router = require('express').Router();
let DraftSurvey = require('../models/draftSurvey.model');

router.route('/').get((req, res) => {
    DraftSurvey.find()
        .then(draftSurveys => res.json(draftSurveys))
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
    const frequency = req.body.frequency;
    const doOnce = req.body.doOnce;
    const openAndCloseTimes = req.body.openAndCloseTimes;
    const builtIns = req.body.builtIns;
    const data = req.body.data;

    const newDraftSurvey = new DraftSurvey({
        projectId,
        sampleGroupId,
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

    newDraftSurvey.save()
        .then(() => res.json('DraftSurvey create!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*router.route('/:id').get((req, res) => {
    Survey.findById(req.params.id)
        .then(surveys => res.json(surveys))
        .catch(err => res.status(400).json('Error: ' + err));
});*/

router.route('/:id').get((req, res) => {
    DraftSurvey.find({ projectId: req.params.id })
        .then(draftSurveys => res.json(draftSurveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find/:id').get((req, res) => {
    DraftSurvey.findById( req.params.id )
        .then(draftSurveys => res.json(draftSurveys))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id/:nameSurvey').get((req, res) => {
    DraftSurvey.find({ projectId: req.params.id, nameSurvey: req.params.nameSurvey  })
        .then(draftSurveys => res.json(draftSurveys))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    DraftSurvey.findByIdAndDelete(req.params.id)
        .then(() => res.json('DraftSurvey deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/edit/:id').post((req, res) => {
    DraftSurvey.findById(req.params.id)
        .then(draftSurveys => {
            draftSurveys.nameSample = req.body.nameSample;
            draftSurveys.nameSurvey = req.body.nameSurvey;
            draftSurveys.description = req.body.description;
            draftSurveys.shareTo = req.body.shareTo;
            draftSurveys.wantName = req.body.wantName;
            draftSurveys.haveGroup = req.body.haveGroup;
            draftSurveys.frequency = req.body.frequency;
            draftSurveys.doOnce = req.body.doOnce;
            draftSurveys.openAndCloseTimes = req.body.openAndCloseTimes;
            draftSurveys.data = req.body.data;


            draftSurveys.save()
                .then(() => res.json('DraftSurvey update!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;