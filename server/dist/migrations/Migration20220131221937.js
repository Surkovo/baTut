"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220131221937 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220131221937 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, "password" text not null);');
    }
}
exports.Migration20220131221937 = Migration20220131221937;
//# sourceMappingURL=Migration20220131221937.js.map