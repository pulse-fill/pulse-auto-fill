const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", function(req, res) {
  // res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getJsonCopy", function(req, res) {
  // res.sendFile(path.join(__dirname, "index.html"));
  res.json(
    {
      "developersList" : [
        {
          "name" : "sai",
          "tagLine": "crazy"
        },
        {
          "name" : "sai",
          "tagLine": "crazy"
        }
      ]
    }
  );
});

app.post("/postJsonCopy", function(req, res) {
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
          "name" : "sai3",
          "tagLine": "crazy"
        }
      ]
    }
  );
});
app.listen( port, () => {
  console.log('Server listening on port:', port);
});
