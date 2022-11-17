"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDependencies = exports.generators = void 0;
const core = __importStar(require("@actions/core"));
const constants_js_1 = require("./constants.js");
const generate_js_1 = require("./generate.js");
const queries_js_1 = require("./queries.js");
const utils_js_1 = require("./utils.js");
var generate_js_2 = require("./generate.js");
Object.defineProperty(exports, "generators", { enumerable: true, get: function () { return generate_js_2.generators; } });
const getDependencies = (config, generatorTypes) => __awaiter(void 0, void 0, void 0, function* () {
    const { owner, repo, octokit } = config;
    const packageJson = [];
    const stackAidJson = { version: 1, dependencies: [] };
    const client = (0, queries_js_1.getClient)(octokit);
    const summary = yield client.getRepositorySummary(owner, repo, '**/');
    const generate = Object.assign(Object.assign({}, generate_js_1.generators), generatorTypes);
    for (const { after, node: { filename }, } of summary) {
        switch (true) {
            case (0, utils_js_1.isFileType)(filename, constants_js_1.FileTypes.go): {
                core.info(`Found ${filename}, getting Go dependencies`);
                const deps = yield generate.go(Object.assign(Object.assign({}, config), { filename }));
                stackAidJson.dependencies.push(...deps);
                break;
            }
            case (0, utils_js_1.isFileType)(filename, constants_js_1.FileTypes.javascript): {
                core.info(`Found ${filename}, copying dependencies`);
                const deps = yield generate.javascript(Object.assign(Object.assign({}, config), { filename }));
                if (deps) {
                    packageJson.push(deps);
                }
                break;
            }
            default:
                const deps = yield generate.graph(Object.assign(Object.assign({}, config), { after }));
                stackAidJson.dependencies.push(...deps);
                break;
        }
    }
    return stackAidJson.dependencies.length
        ? { stackAidJson, packageJson }
        : { packageJson };
});
exports.getDependencies = getDependencies;
