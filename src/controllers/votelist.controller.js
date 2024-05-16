const db = require("../models");
const { Op } = require("sequelize");
const { convertToKoreanTime } = require("../utils/convertToKoreanTime");

const { Vote, Count, Content } = db;

const getVoteList = async (req, res) => {
  try {
    const { offset, limit, search } = req.query;

    if (offset <= 0 || limit <= 0) {
      res.status(400).send({ message: "offset과 limit은 0보다 커야 합니다." });
      return;
    }

    if (offset && limit && offset > limit) {
      res.status(400).send({ message: "offset은 limit보다 작아야 합니다." });
      return;
    }

    let voteQuery = {};
    if (search) {
      voteQuery = {
        [Op.or]: {
          title: { [Op.like]: `%${search}%` },
          hostName: { [Op.like]: `%${search}%` },
        },
      };
    }

    const lists = await Vote.findAll({
      where: voteQuery,
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
