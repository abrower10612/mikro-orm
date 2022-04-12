import { Migration } from '@mikro-orm/migrations';

export class Migration20220412150524 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `post` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` text not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('drop table if exists `persons`;');
  }

  async down(): Promise<void> {
    this.addSql('create table `persons` (`id` int unsigned not null auto_increment primary key, `lastName` varchar(255) null, `firstName` varchar(255) null, `email` varchar(255) null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('drop table if exists `post`;');
  }

}
