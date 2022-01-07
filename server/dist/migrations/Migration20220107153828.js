"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220107153828 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220107153828 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "post" ("id" serial primary key, "title" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    }
}
exports.Migration20220107153828 = Migration20220107153828;
//# sourceMappingURL=Migration20220107153828.js.map