const db = require("../models");

const { Vote, Content, Count } = db;

const getVote = async (req, res) => {
  const { id } = req.params;
  const vote = await Vote.findOne({ where: { id } });
  const contents = await Content.findAll({
    where: { vote_id: id },
    attributes: ["id", "vote_id", "content", "createdAt", "updatedAt"],
  });
  const result = { ...vote.dataValues, contents };

  if (vote) {
    res.send(result);
    return;
  }

  res.status(404).send({ message: "투표가 존재하지 않습니다." });
};

const createVote = async (req, res) => {
  const newVote = req.body;
  console.log(newVote.contents[0]);
  const vote = await Vote.create(newVote);
  const contents = await Content.bulkCreate(
    newVote.contents.map((content) => ({
      content,
      vote_id: vote.id,
    }))
  );

  if (vote) {
    res.send({ ...vote.dataValues, contents });
    return;
  }

  res.status(404).send({ message: "투표 생성 실패~" });
};

const editVote = async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const result = await Vote.update(newInfo, { where: { id } });

  if (result[0]) {
    res.send({ message: `${result[0]}개의 행이 영향받았습니다.` });
    return;
  }

  res.status(404).send({ message: "수정실패~" });
};

const doVote = async (req, res) => {
  const { voteId, contentId } = req.params;
  const doVote = await Count.create({ vote_id: voteId, content_id: contentId });

  if (doVote) {
    res.send({ message: "투표가 완료되었습니다." });
    return;
  }

  res.status(404).send({ message: "투표 실패~" });
};

const deleteVote = async (req, res) => {
  const { id } = req.params;
  const deletedCount = await Vote.destroy({ where: { id } });

  if (deletedCount) {
    res.send({ message: `${deletedCount}개 삭제 되었습니다.` });
    return;
  }

  res.status(404).send({ message: "삭제할 수 없습니다." });
};

module.exports = {
  getVote,
  createVote,
  editVote,
  doVote,
  deleteVote,
};
