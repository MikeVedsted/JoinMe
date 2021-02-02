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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
exports.default = {
    query(text, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = Date.now();
            const res = yield pool.query(text, params);
            const duration = Date.now() - start;
            console.log('executed query', { text, duration, rows: res.rowCount });
            return res;
        });
    },
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            const query = client.query;
            const release = client.release;
            // set a timeout of 5 seconds, after which we will log this client's last query
            const timeout = setTimeout(() => {
                console.error('A client has been checked out for more than 5 seconds!');
                console.error(`The last executed query on this client was: ${client.lastQuery}`);
            }, 5000);
            // monkey patch the query method to keep track of the last query executed
            client.query = (...args) => {
                client.lastQuery = args;
                return query.apply(client, args);
            };
            client.release = () => {
                // clear our timeout
                clearTimeout(timeout);
                // set the methods back to their old un-monkey-patched version
                client.query = query;
                client.release = release;
                return release.apply(client);
            };
            return client;
        });
    }
};
//# sourceMappingURL=index.js.map