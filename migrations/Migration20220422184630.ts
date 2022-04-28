import { Migration } from '@mikro-orm/migrations';

export class Migration20220422184630 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `book` drop foreign key `book_author_id_foreign`;');

    this.addSql('create table `posts` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null, `description` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `comments` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `comment` text not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `authors` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `age` int not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `books` (`id` int unsigned not null auto_increment primary key, `author_id` int unsigned not null, `name` varchar(255) not null, `year` int not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `books` add index `books_author_id_index`(`author_id`);');

    this.addSql('alter table `books` add constraint `books_author_id_foreign` foreign key (`author_id`) references `authors` (`id`) on update cascade;');

    this.addSql('drop table if exists `post`;');

    this.addSql('drop table if exists `comment`;');

    this.addSql('drop table if exists `author`;');

    this.addSql('drop table if exists `book`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `books` drop foreign key `books_author_id_foreign`;');

    this.addSql('create table `post` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `title` varchar(255) not null, `description` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `comment` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `comment` text not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `author` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `age` int not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `book` (`id` int unsigned not null auto_increment primary key, `author_id` int unsigned not null, `name` varchar(255) not null, `year` int not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `book` add index `book_author_id_index`(`author_id`);');

    this.addSql('alter table `book` add constraint `book_author_id_foreign` foreign key (`author_id`) references `author` (`id`) on update cascade;');

    this.addSql('drop table if exists `posts`;');

    this.addSql('drop table if exists `comments`;');

    this.addSql('drop table if exists `authors`;');

    this.addSql('drop table if exists `books`;');
  }

}
