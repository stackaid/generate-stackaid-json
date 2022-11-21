"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileType = exports.matches = void 0;
const minimatch_1 = __importDefault(require("minimatch"));
const matches = (file, fileTypes, glob = '') => (0, minimatch_1.default)(file.toLowerCase(), `${glob}*(${fileTypes.join('|')})`);
exports.matches = matches;
const isFileType = (filename, fileType) => (0, exports.matches)(filename, fileType, '**/');
exports.isFileType = isFileType;
