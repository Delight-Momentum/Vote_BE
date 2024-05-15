const bcrypt = require("bcryptjs");

const db = require("../models");

const { Vote, Content, Count } = db;

const getVote = async (req, res) => {
  try {
    const { id } = req.params;
    const vote = await Vote.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!vote) {
      res.status(404).send({ message: "투표가 존재하지 않습니다." });
      return;
    }

    const contents = await Content.findAll({
      where: { voteId: id },
      attributes: ["id", "voteId", "content", "createdAt", "updatedAt"],
    });

    const selectedCounts = contents.map(async (content) => {
      const count = await Count.findAll({
        where: { voteId: id, contentId: content.dataValues.id },
        attributes: ["id", "voteId", "contentId"],
      });

      return count.length;
    });

    const result = await Promise.all(selectedCounts).then((counts) => {
      const participantCounts = counts.reduce((acc, cur) => acc + cur, 0);
      return {
        ...vote.dataValues,
        participantCounts,
        contents: contents.map((content, index) => ({
          ...content.dataValues,
          selectedCounts: counts[index],
        })),
      };
    });

    if (result) {
      res.send(result);
      return;
    }
  } catch {
    res.status(500).send({ message: "투표 조회에 실패했습니다." });
  }
};

const createVote = async (req, res) => {
  try {
    const newVote = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newVote.password, salt);

    const vote = await Vote.create({ ...newVote, password: hash });

    const contents = await Content.bulkCreate(
      newVote.contents.map((content) => ({
        content,
        voteId: vote.id,
      }))
    );

    if (vote) {
      res.status(201).send({ ...vote.dataValues, contents });
      return;
    }
  } catch {
    res.status(500).send({ message: "투표 생성에 실패했습니다." });
  }
};

const editVote = async (req, res) => {
  try {
    const { id } = req.params;
    const newInfo = req.body;

    const vote = await Vote.findOne({ where: { id } });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      vote.password
    );

    if (!isPasswordCorrect) {
      res.status(401).send({ message: "비밀번호가 틀렸습니다." });
      return;
    }

    const result = await Vote.update(
      { periodEnd: newInfo.periodEnd },
      { where: { id } }
    );

    if (result[0]) {
      res.send({ message: `${result[0]}개의 행이 영향받았습니다.` });
      return;
    }
  } catch {
    res.status(500).send({ message: "투표 수정에 실패했습니다." });
  }
};

const doVote = async (req, res) => {
  try {
    const { voteId, contentId } = req.params;
    const validateVote = await Vote.findOne({ where: { id: voteId } });

    if (!validateVote) {
      res.status(404).send({ message: "존재하지 않는 투표입니다." });
      return;
    }

    const doVote = await Count.create({ voteId: voteId, contentId: contentId });

    if (doVote) {
      res.send({ message: "투표가 완료되었습니다." });
      return;
    }
  } catch {
    res.status(500).send({ message: "투표를 실패했습니다." });
  }
};

const deleteVote = async (req, res) => {
  try {
    const { id } = req.params;
    const vote = await Vote.findOne({ where: { id } });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      vote.password
    );

    if (!isPasswordCorrect) {
      res.status(401).send({ message: "비밀번호가 틀렸습니다." });
      return;
    }

    const deletedContents = await Content.destroy({ where: { voteId: id } });

    const deletedCounts = await Count.destroy({ where: { voteId: id } });

    const deletedVote = await Vote.destroy({ where: { id } });

    if (deletedVote) {
      res.send({
        message: `Vote: ${deletedVote}개, Counts: ${deletedCounts}개, Contents: ${deletedContents}개 삭제 되었습니다.`,
      });
    }
  } catch {
    res.status(500).send({ message: "투표 삭제를 실패했습니다." });
  }
};

module.exports = {
  getVote,
  createVote,
  editVote,
  doVote,
  deleteVote,
};
