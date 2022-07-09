const express = require('express');
const notion = require('./notion.js');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

app.get('/create-monthly-checkboxes', async (req, res) => {
  await notion.createMonthlyCheckboxes();
  res.send('Triggered month checkboxes creation')
})
