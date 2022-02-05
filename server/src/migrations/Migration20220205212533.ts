import { Migration } from '@mikro-orm/migrations';

export class Migration20220205212533 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop column "title";');
  }

}
