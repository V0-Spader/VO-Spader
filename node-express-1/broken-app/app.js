import express, { json } from 'express';
import { get } from 'axios';
var app = express();

app.use(json()); // for parsing application/json

app.post('/', async function(req, res, next) {
  try {
    let results = await Promise.all(req.body.developers.map(d => {
      return get(`https://api.github.com/users/${d}`);
    }));

    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch (err) {
    next(err);
  }
});

app.listen(3000);
