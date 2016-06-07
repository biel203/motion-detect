"use strict";
class MotionDetect {

    constructor (info) {
    }

    start (req, res) {
        try {
            if (req.query) {
                res.send(req.query);
            } else {
                res.send('OK');
            }
        } catch (error) {
            res.send(error);
        }
    }
};

module.exports = MotionDetect;