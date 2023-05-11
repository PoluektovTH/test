const express = require('express');
const cors = require('cors');

const config = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cors());
};

module.exports = config;
