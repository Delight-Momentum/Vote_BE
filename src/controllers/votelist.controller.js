const db = require("../models");
const { convertToKoreanTime } = require("../utils/convertToKoreanTime");

const { Vote, Count, Content } = db;

const getVoteList = async (req, res) => {
  const { offset, limit } = req.query;
  const lists = await Vote.findAll();

  const participantCounts = lists.map(async (vote) => {
    const count = await Count.findAll({ where: { voteId: vote.id } });
    return count.length;
  });

  const contents = await Content.findAll();
  console.log(contents);
  const result = await Promise.all(participantCounts).then((counts) =>
    lists.map((vote, index) => {
      const convertTime = convertToKoreanTime(new Date());

      return {
        ...vote.dataValues,
        contents: contents
          .filter((content) => content.voteId === vote.id)
          .map((content) => content.content),
        participantCounts: counts[index],
        isClosed: vote.dataValues.periodEnd < convertTime,
      };
    })
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
