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
exports.runDbBlogs = exports.blogsCollection = exports.db = exports.client = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URL || 'mongodb+srv://MihPar:MihPar1981@cluster0.e2lfxsd.mongodb.net/?retryWrites=true&w=majority';
console.log(process.env.MONGO_URL);
exports.client = new mongodb_1.MongoClient(mongoURI);
exports.db = exports.client.db('bd');
exports.blogsCollection = exports.db.collection('blogs');
function runDbBlogs() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            yield exports.client.db('blogs').command({ ping: 1 });
            console.log('Connect successfully to mongo server');
        }
        catch (_a) {
            console.log('Cann`t to connect to db');
            yield exports.client.close();
        }
    });
}
exports.runDbBlogs = runDbBlogs;
