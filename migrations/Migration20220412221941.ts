import { Migration } from '@mikro-orm/migrations';

export class Migration20220412221941 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `post` drop `test`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `post` add `test` varchar(255) not null;');
  }

}
