#!/usr/bin/env node
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var inquirer_1 = require("inquirer");
var studio_sdk_1 = require("@chili-publish/studio-sdk");
var program = new commander_1.Command();
// Create a connection to the gRPC service
var sdk = new studio_sdk_1.default({});
program
    .name('studio-sdk-cli')
    .description('CLI example for using the Studio SDK')
    .version('1.0.0');
program
    .command('health')
    .description('Check the health of the Studio SDK service')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sdk.document.load('{}')];
            case 1:
                response = _a.sent();
                console.log('Health check response:', response);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Health check failed:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
program
    .command('run-session')
    .description('Start an interactive session with the Studio SDK')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var command, _a, cmd, args, response, error_2, error_3;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 8, , 9]);
                _c.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 7];
                return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: 'command',
                            message: 'Enter a command (or "exit" to quit):',
                            default: 'help'
                        }
                    ])];
            case 2:
                command = (_c.sent()).command;
                if (command.toLowerCase() === 'exit') {
                    return [3 /*break*/, 7];
                }
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                _a = command.split(' '), cmd = _a[0], args = _a.slice(1);
                return [4 /*yield*/, (_b = sdk)[cmd].apply(_b, args)];
            case 4:
                response = _c.sent();
                console.log('Response:', response);
                return [3 /*break*/, 6];
            case 5:
                error_2 = _c.sent();
                console.error('Command failed:', error_2);
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 1];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_3 = _c.sent();
                console.error('Session error:', error_3);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
program.parse();
