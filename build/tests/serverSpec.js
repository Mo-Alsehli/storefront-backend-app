"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
describe("Testing The Server Status", () => {
    it("Server Route Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).get('/').expect(200);
    });
});
