// server.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
require('./config/passport')(passport);

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

mongoose.connect('mongodb://localhost/auth-demo', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
