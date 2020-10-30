const http = require("http");
const request = require("request");
const cron = require("node-cron");
const express = require("express");
const { parse } = require("querystring");
const app = express();

app.get("/", function(req, res) {
  // res.sendFile(path.join(__dirname, "index.html"));
});

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    collectRequestData(req, result => {
      registerCron(result.default_msg, result.username_mail, result.username);
      res.end(
        `Successfully registered auto fill to fill pulse for ${
          result.username_mail
        }`
      );
    });
  } else {
    res.end(`
          <!doctype html>
          <html>
            <body>
              <form action="/" method="post">
                <input type="text" name="username_mail" placeholder="Mail" /> @knowledgelens.com<br />
                <input type="text" name="default_msg" placeholder="Message" /><br />
                <input type="text" name="username"  placeholder="User Name" /><br />
                <button>Save</button>
              </form>
            </body>
          </html>
      `);
  }
});
server.listen(process.env.PORT || 8081);
function collectRequestData(request, callback) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  if (request.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    request.on("data", chunk => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}

<<<<<<< Updated upstream:app.js
function registerCron(msg, mail, name) {
  cron.schedule("0 9 * * MON-FRI", function() {
    var startDate = getTodaysDate();
    console.log(startDate);
    checkIfFilledStatusForDate(startDate,name,mail)
    .then(()=>{
      postData(msg, mail, name,startDate);
      console.log("filling pulse every day for-- ", mail, "on ",startDate);
    })
    .catch((e)=> {
      console.log("already filled for - ",startDate," for -", mail);
    })
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });
}

function getTodaysDate() {
  var dateInWhateverTimeZone = new Date();
  var miliSecForThatDate = dateInWhateverTimeZone.getTime();
  var offsetTimeZoneMilliSec = dateInWhateverTimeZone.getTimezoneOffset()*60000;
  var exactUtcMilliSec = miliSecForThatDate + offsetTimeZoneMilliSec;
  var offsetMilliSecForOurCity = 5.5 * 3600000;// 5:30 hrs ahead of utc - to milliseconds
  var milliSecondsAtCurrCity = exactUtcMilliSec + offsetMilliSecForOurCity;
  var dateAtCurrCity = new Date(milliSecondsAtCurrCity);
  var currStartDate = `${dateAtCurrCity.getMonth() + 1}/${dateAtCurrCity.getDate()}/${dateAtCurrCity.getFullYear()}`;
  return currStartDate;
}

function checkIfFilledStatusForDate(date,name,mail) { 
  return new Promise((resolve,reject) => {
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: "https://klpulse.knowledgelens.com/status/getStatus",
        body: JSON.stringify({
          name: `${name}`,
          email: `${mail}@knowledgelens.com`,
          startDate: `${date}`,
          endDate: `${date}`
        })
      },
      (error, respnse, body) => {
        if(error) {
          resolve();
=======
app.post("/postJson", function(req, res) {
  // res.sendFile(path.join(__dirname, "index.html"));
  res.json(
    {
      "developersList" : [
        {
          "name" : "sai",
          "tagLine": "crazy"
        },
        {
          "name" : "sai2",
          "tagLine": "crazy"
        },
        {
          "name" : "sai5",
          "tagLine": "crazy"
>>>>>>> Stashed changes:pulse-auto-fill-2/app.js
        }
        if(respnse.hasOwnProperty('body')) {
          var resp = JSON.parse(body);
          if(resp.hasOwnProperty('status') && resp['status'].length > 0) {
            
            if(resp['status'][0]['taskToday'] === '' || !resp['status'][0]['taskToday'] || resp['status'][0]['taskToday'].trim() === '') {
              resolve();
            } else {
              reject();            
            }
          } else {
            resolve();
          }
        }
      }
    );
  })
}

function postData(msg = ".", mail = "", name = "",startDate = "") {
  request.post(
    {
      headers: { "content-type": "application/json" },
      url: "http://klpulse.knowledgelens.com/status/createStatus",
      body: JSON.stringify({
        startDate: startDate,
        name: `${name}`,
        email: `${mail}@knowledgelens.com`,
        taskToday: `${msg}`,
        taskResolved: "",
        message: [],
        taskCompletion: "true",
        delayedStatus: "false",
        rating: "0",
        reviews: "0",
        ratedBy: [],
        goalTomorrow: "",
        innovationOrIdea: "",
        appreciation: "",
        pendingObstucles: ""
      })
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
    }
  );
}
