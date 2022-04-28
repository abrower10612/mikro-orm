import { Migration } from '@mikro-orm/migrations';

export class Migration20220422141801 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `author` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `age` int not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `book` (`id` int unsigned not null auto_increment primary key, `author_id` int unsigned not null, `name` varchar(255) not null, `year` int not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `book` add index `book_author_id_index`(`author_id`);');

    this.addSql('alter table `book` add constraint `book_author_id_foreign` foreign key (`author_id`) references `author` (`id`) on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `book` drop foreign key `book_author_id_foreign`;');

    this.addSql('drop table if exists `author`;');

    this.addSql('drop table if exists `book`;');
  }

}
