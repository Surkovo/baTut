"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220205212533 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220205212533 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" drop column "title";');
    }
}
exports.Migration20220205212533 = Migration20220205212533;
//# sourceMappingURL=Migration20220205212533.js.map