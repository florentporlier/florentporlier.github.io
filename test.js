const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  {
    username: 'admin',
    password: 'password'
  }
];

app.get('/login', (req, res) => {
  res.send(
    <form method="post" action="/login">
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Log In</button>
    </form>
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    res.send('Invalid username or password');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.send('Welcome to the dashboard!');
  } else {
    res.redirect('/login');
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000/%27);
});