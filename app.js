const http = require("http");
const path = require('path');
const request = require('request'); 
const cron = require("node-cron");


const { parse } = require("querystring");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    collectRequestData(req, result => {
      console.log(result);
      registerCron(result.default_msg,result.username_mail,result.username);
      postData(result.default_msg,result.username_mail,result.username);
      res.end(`Successfully registered cron job to fill pulse for ${result.username_mail}`);
    });
  } else {
    res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="username_mail" placeholder="mail id leaving the @knowledgelens.com ." /><br />
                    <input type="text" name="default_msg" placeholder="default message to be filled" /><br />
                    <input type="text" name="username"  placeholder="exact username" /><br />
                    <button>Save</button>
                </form>
            </body>
            </html>
        `);
  }
});
server.listen(5000);

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

function registerCron(msg,mail,name) {
  cron.schedule("* * * * *", function() {
    postData(msg,mail,name);
    console.log("filling pulse every minute for-- ",mail);
  });
}

function postData(msg = '.',mail='',name=''){
  request.post({
    "headers": { "content-type": "application/json" },
    "url": "https://klpulse.knowledgelens.com/status/createStatus",
    "body": JSON.stringify({
      "startDate": "02/01/2019",
      "name": `${name}`,
      "email": `${mail}@knowledgelens.com`,
      "taskToday": `${msg}`,
      "taskResolved": "",
      "message": [],
      "taskCompletion": "true",
      "delayedStatus": "false",
      "rating": "0",
      "reviews": "0",
      "ratedBy": [],
      "goalTomorrow": "",
      "innovationOrIdea": "",
      "appreciation": "",
      "pendingObstucles": ""
    })
}, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
});
  
}
