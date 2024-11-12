// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

function formatDate(date) {
  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
}

app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  // Handle empty date parameter: Use current date
  if (!dateParam) {
    const currentDate = new Date();
    return res.json(formatDate(currentDate));
  }

  // Check if dateParam is a UNIX timestamp (contains only digits)
  if (!isNaN(dateParam)) {
    dateParam = parseInt(dateParam);
  }

  // Create a date object from the dateParam
  const date = new Date(dateParam);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Respond with UNIX and UTC formats
  res.json(formatDate(date));
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
