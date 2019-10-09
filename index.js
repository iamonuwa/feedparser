let feed = require("feed-read"),
  http = require("http"),
  csvParser = require("csv-parser"),
  fs = require("fs"),
  request = require("request"),
  mongoose = require("mongoose"),
  FeedsModel = require("./model/feeds"),
  ErrorModel = require("./model/error");

let DB = process.env.DB_URL || "mongodb://localhost:27017/parser";
mongoose.connect(DB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

http
  .createServer(function(req, res) {
    let body = "";
    req
      .on("data", chunk => {
        body += chunk.toString();
      })
      .on("end", () => {
        setInterval(() => {
          startUp(body);
        }, 30000);
        res.end("ok");
      });
  })
  .listen(process.env.PORT || 1337);

function startUp() {
  request(url)
    .pipe(csvParser())
    .on("data", row => {
      feed(row.RSS, (error, feeds) => {
        if (error) {
          let errorModel = new ErrorModel({
            link: row.RSS
          });
          errorModel.save(error => {
            if (error) {
              console.log(error);
            }
          });
        } else {
          for (let i = 0; i < feeds.length; i++) {
            let feedsModel = new FeedsModel({
              title: feeds[i].title,
              content: feeds[i].content,
              published: feeds[i].published,
              author: feeds[i].author,
              link: feeds[i].link,
              feed: {
                source: feeds[i].feed.source,
                link: feeds[i].feed.link,
                name: feeds[i].feed.name
              }
            });
            feedsModel.save(error => {
              if (error) {
                console.log(error);
              }
              console.log(feeds);
            });
          }
        }
      });
    });
}
