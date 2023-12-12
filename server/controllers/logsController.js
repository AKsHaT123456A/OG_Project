const log = require("../models/logs");
const User = require("../models/user");
const { getCompleteLogsByIds } = require("../utils/arrayLogs");

const createLog = async (req, res) => {
    try {
        const { logName, usedFrom, usedBy } = req.body;
        // const { id } = req.cookies;
        const id = "d80defd4-3398-4745-8c03-8e0f6825afc3";
        console.log(id);
        const user = await User.findOne({ id: id });
        console.log(user);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        };
        const surveyLog = await log.findOne({ logName: logName, userId: id });
        if (surveyLog) {
            const completeLogs = await getCompleteLogsByIds(user.logs);
            return res.status(409).json({
                message: "Log already exists",
                logs: completeLogs,
            });
        }

        const newLog = new log({
            logName,
            usedFrom,
            usedBy,
            userId: id
        });
        await newLog.save();
        user.logs.push(newLog._id);
        await user.save();
        const populatedUser = await User.findOne({ id }).populate("logs").select("-_id -__v");
        return res.status(201).json({
            message: "New log created",
            log: populatedUser.logs,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message,
        });
    }
};

const deleteLog = async (req, res) => {
    try {
        const { logName } = req.body;
        const prevLog = await log.findOne({ logName });
        // const { id } = req.cookies;
        const id = "d80defd4-3398-4745-8c03-8e0f6825afc3";


        const user = await User.findOne({ id: id });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const index = user.logs.indexOf(prevLog._id);
        if (index > -1) {
            user.logs.splice(index, 1);
        }

        await log.findByIdAndDelete(prevLog._id);
        await survey.deleteMany({ logName });
        await user.save();

        return res.status(200).json({
            message: "Log deleted",
            logs: user.logs,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message,
        });
    }
};

const deleteAllLogs = async (req, res) => {
    const id = "d80defd4-3398-4745-8c03-8e0f6825afc3";
    await log.deleteMany({ userId: id });
    return res.status(200).json({
        message: "Log deleted",
    })
}
const editLog = async (req, res) => {
    const { logName } = req.body;
    const { editLogName, usedBy, usedFrom } = req.body;
    const prevLog = await log.findOneAndUpdate({ logName }, { $set: { logName: editLogName, usedBy, usedFrom } });
    return res.status(200).json({
        message: "Log edited",
        log: prevLog,
    });
}

const getAllLogs = async (req, res) => {
    const { id } = req.cookies;
    const userId = " d80defd4-3398-4745-8c03-8e0f6825afc3";
    const allLogs = await log.find({ userId: userId });
    return res.status(200).json({
        message: "All logs",
        logs: allLogs,
    });

}

module.exports = { createLog, deleteLog, editLog, getAllLogs, deleteAllLogs };