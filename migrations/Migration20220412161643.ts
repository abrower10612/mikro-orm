import { Migration } from '@mikro-orm/migrations';

export class Migration20220412161643 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `post` add `description` text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `post` drop `description`;');
  }

}
