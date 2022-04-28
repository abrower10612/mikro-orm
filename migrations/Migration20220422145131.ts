import { Migration } from '@mikro-orm/migrations';

export class Migration20220422145131 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `MyUnderscoreEntities` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('drop table if exists `my_underscore_entity`;');
  }

  async down(): Promise<void> {
    this.addSql('create table `my_underscore_entity` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('drop table if exists `MyUnderscoreEntities`;');
  }

}
