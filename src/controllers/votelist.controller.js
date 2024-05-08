const db = require("../models");

const { Vote, Count } = db;

const getVoteList = async (req, res) => {
  const { offset, limit } = req.query;
  const lists = await Vote.findAll();

  const participantCounts = lists.map(async (vote) => {
    const count = await Count.findAll({ where: { vote_id: vote.id } });
    return count.length;
  });
  const result = await Promise.all(participantCounts).then((counts) =>
    lists.map((vote, index) => ({
      ...vote.dataValues,
      participantCounts: counts[index],
    }))
  );

  if (offset && limit) {
    res.send(result.slice(offset - 1, offset - 1 + limit));
    return;
  }

  res.send(result);
};

module.exports = {
  getVoteList,
};
