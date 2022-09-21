"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvent = exports.createEvent = void 0;
const moment_1 = __importDefault(require("moment"));
const Event_1 = require("../models/Event");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = new Event_1.Event(Object.assign(Object.assign({}, req.body), { creator: req.userId, createdAt: new Date().toISOString() }));
    try {
        if (event) {
            yield event.save();
            console.log(event);
            res.status(200).send(event);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.createEvent = createEvent;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield Event_1.Event.find({
        start: {
            $gte: (0, moment_1.default)(req.query.start).toDate
        }
    });
});
exports.getEvent = getEvent;
//# sourceMappingURL=calender.js.map