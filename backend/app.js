const app         = require('express')();
const express = require('express');
const cors        = require('cors');
const mountRoutes = require('./controllers');

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));

mountRoutes(app);

module.exports = app;