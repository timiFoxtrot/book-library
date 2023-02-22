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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./src/app"));
const supertest_1 = __importDefault(require("supertest"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const node_test_1 = require("node:test");
(0, node_test_1.describe)("create a book", () => {
    let mongoServer;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri(), {});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (mongoServer) {
            yield mongoServer.stop();
            yield mongoose_1.default.disconnect();
        }
    }));
    it('should create a book', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post('/books/add-book').send({
            Title: "Annihilation",
            Author: "Timi Foxtrot",
            datePublished: "date",
            Description: "This is just a dummy description",
            pageCount: 12,
            Genre: "War",
            bookId: 2,
            Publisher: "Tim Prints"
        });
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('data');
    }));
});
