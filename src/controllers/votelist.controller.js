const db = require("../models");
const { convertToKoreanTime } = require("../utils/convertToKoreanTime");

const { Vote, Count, Content } = db;

const getVoteList = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const lists = await Vote.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    const participantCounts = lists.map(async (vote) => {
      const count = await Count.findAll({ where: { voteId: vote.id } });
      return count.length;
    });

    const contents = await Content.findAll();

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
  } catch {
    res.status(500).send({ message: "투표 리스트 조회에 실패했습니다." });
  }
};

module.exports = {
  getVoteList,
};
