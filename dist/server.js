"use strict";

var express = require("express");
var voteController = require("./controllers/vote.controller");
var voteListController = require("./controllers/votelist.controller");
var app = express();
app.use(express.json());
app.get("/api/votelist", voteListController.getVoteList);
app.get("/api/votelist/:id", voteController.getVote);
app.post("/api/vote", voteController.createVote);
app.post("/api/vote/:voteId/:contentId", voteController.doVote);
app.put("/api/vote/:id", voteController.editVote);
app["delete"]("/api/vote/:id", voteController.deleteVote);
app.listen(3000, function () {});