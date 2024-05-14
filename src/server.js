const express = require("express");
const cors = require("cors");
const voteController = require("./controllers/vote.controller");
const voteListController = require("./controllers/votelist.controller");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/votelist", voteListController.getVoteList);

app.get("/api/votelist/:id", voteController.getVote);

app.post("/api/vote", voteController.createVote);

app.post("/api/vote/:voteId/:contentId", voteController.doVote);

app.put("/api/vote/:id", voteController.editVote);

app.delete("/api/vote/:id", voteController.deleteVote);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
