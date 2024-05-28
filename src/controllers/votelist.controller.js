const db = require("../models");
const { Op } = require("sequelize");
const { convertToKoreanTime } = require("../utils/convertToKoreanTime");

const { Vote, Count, Content } = db;

const getVoteList = async (req, res) => {
  try {
    const { offset, limit, search } = req.query;

    if (Number(offset) <= 0 || Number(limit) <= 0) {
      res.status(400).send({ message: "offset과 limit은 0보다 커야 합니다." });
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

    const totalCount = await Vote.count({
      where: voteQuery,
    });

    const lists = await Vote.findAll({
      where: voteQuery,
      attributes: {
        exclude: ["password"],
      },
      offset: offset ? Number(offset) - 1 : 0,
      limit: limit ? Number(limit) : 100,
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

    res.send({
      total: totalCount,
      contentTotal: result.length,
      hasNext: totalCount > Number(offset) + Number(limit),
      votes: result,
    });
  } catch {
    res.status(500).send({ message: "투표 리스트 조회에 실패했습니다." });
  }
};

module.exports = {
  getVoteList,
};
