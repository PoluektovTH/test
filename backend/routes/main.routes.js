const router = require('express').Router();
const { Photo } = require('../db/models');

router.route('/get').get(async (req, res) => {
  try {
    console.log('upload');
    const photos = await Photo.findAll({ raw: true });
    res.status(200).json(photos);
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

router.route('/upload').post(async (req, res) => {
  try {
    console.log('newSet');
    const { name, url } = req.body;
    const downloaded = await Photo.create({ name: name, url: url });
    res.status(200).json(downloaded);
  } catch ({ message }) {
    console.log(message);
    res.status(500).json(message);
  }
});

router.route('/delAll').get(async (req, res) => {
  try {
    console.log('deleted');
    await Photo.destroy({ where: {} });
    res.status(200).json('Deleted');
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

module.exports = router;
