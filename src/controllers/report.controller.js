const db = require("../models");

const { Report, Vote } = db;

const getReports = async (req, res) => {
  try {
    const { offset, limit, order } = req.query;

    if (Number(offset) <= 0 || Number(limit) <= 0) {
      res.status(400).send({ message: "offset과 limit은 0보다 커야 합니다." });
      return;
    }

    if (order && order !== "open" && order !== "voteId") {
      res.status(400).send({ message: "order는 open 이어야 합니다." });
      return;
    }

    let reportQuery = {};

    if (order === "open") {
      reportQuery.isOpenReport = true;
    }

    const reports = await Report.findAll({
      where: reportQuery,
      offset: offset ? Number(offset) - 1 : 0,
      limit: limit ? Number(limit) : 100,
      order: order === "voteId" ? [["voteId", "ASC"]] : [["createdAt", "DESC"]],
    });

    if (reports.length === 0) {
      return res.status(404).json({ message: "신고된 내역이 없습니다." });
    }

    const reportsData = await Promise.all(
      reports.map(async (report) => {
        const vote = await Vote.findOne({
          where: { id: report.voteId },
          attributes: { exclude: ["password"] },
        });
        const {
          id,
          voteId,
          reportType,
          isOpenReport,
          reportResult,
          createdAt,
          updatedAt,
        } = report;
        return {
          voteId: voteId,
          vote,
          report: {
            id,
            reportType,
            isOpenReport,
            reportResult,
            createdAt,
            updatedAt,
          },
        };
      })
    );

    const response = {
      total: reports.length,
      open: reports.filter((report) => report.isOpenReport).length,
      close: reports.filter((report) => !report.isOpenReport).length,
      reports: reportsData,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReport = async (req, res) => {
  try {
    const { order, offset, limit } = req.query;

    if (Number(offset) <= 0 || Number(limit) <= 0) {
      res.status(400).send({ message: "offset과 limit은 0보다 커야 합니다." });
      return;
    }

    if (order && order !== "open") {
      res.status(400).send({ message: "order는 open 이어야 합니다." });
      return;
    }

    let reportQuery = {};

    if (order === "open") {
      reportQuery.isOpenReport = true;
    }

    const reports = await Report.findAll({
      where: { voteId: req.params.voteId, ...reportQuery },
      offset: offset ? Number(offset) - 1 : 0,
      limit: limit ? Number(limit) : 100,
      attributes: ["id", "reportType", "isOpenReport"],
    });

    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: "신고된 내역이 없습니다." });
    }

    const vote = await Vote.findOne({
      where: { id: req.params.voteId },
      attributes: { exclude: ["password"] },
    });

    const response = {
      voteId: Number(req.params.voteId),
      total: reports.length,
      open: reports.filter((report) => report.isOpenReport).length,
      close: reports.filter((report) => !report.isOpenReport).length,
      vote,
      reports,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReport = async (req, res) => {
  try {
    if (!req.body.reportType) {
      return res.status(400).json({ message: "신고 타입을 입력해주세요." });
    }

    if (req.body.reportType !== "abuse" && req.body.reportType !== "spam") {
      return res.status(400).json({
        message:
          "신고 타입이 올바르지 않습니다. reportType은 abuse 또는 spam이어야 합니다.",
      });
    }

    const vote = await Vote.findByPk(req.params.voteId);

    if (!vote) {
      return res.status(404).json({ message: "투표를 찾을 수 없습니다." });
    }

    const report = await Report.create({
      voteId: req.params.voteId,
      reportType: req.body.reportType,
      isOpenReport: true,
    });

    res.json({ message: "신고가 완료되었습니다." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const closeReport = async (req, res) => {
  if (
    !req.body.type &&
    req.body.type !== "reject" &&
    req.body.type !== "approve"
  ) {
    return res.status(400).json({
      message: "type을 입력해주세요. type은 reject 또는 approve이어야 합니다.",
    });
  }

  try {
    const vote = await Vote.findByPk(req.params.voteId);
    if (!vote) {
      return res.status(404).json({ message: "투표를 찾을 수 없습니다." });
    }

    if (req.body.type === "reject") {
      try {
        const report = await Report.findByPk(req.params.reportId);

        report.isOpenReport = false;
        report.reportResult = "reject";
        await report.save();

        return res.json({ message: "신고가 거절되었습니다." });
      } catch (error) {
        return res.status(500).json({ message: "신고 거절에 실패하였습니다." });
      }
    }

    vote.destroy();

    const matchAllReports = await Report.findAll({
      where: { voteId: req.params.voteId },
    });

    matchAllReports.forEach(async (report) => {
      report.isOpenReport = false;
      report.reportResult = "approve";
      await report.save();
    });

    const reports = await Report.findAll({
      where: { voteId: req.params.voteId },
      attributes: ["id", "reportType", "isOpenReport"],
    });

    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: "신고된 내역이 없습니다." });
    }

    const response = {
      voteId: Number(req.params.voteId),
      total: reports.length,
      open: reports.filter((report) => report.isOpenReport).length,
      close: reports.filter((report) => !report.isOpenReport).length,
      reports,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getReports, getReport, createReport, closeReport };
