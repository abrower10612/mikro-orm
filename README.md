# mikro-orm

In order to set up MikroORM, a mikro-orm.config file is necessary as you see below. This file initializes the MikroORM connection and is referenced in each endpoint within each controller.

## Installation

Select and run one of the following installations via CLI:

```
npm i -s @mikro-orm/core @mikro-orm/mongodb     # for mongo
npm i -s @mikro-orm/core @mikro-orm/mysql       # for mysql/mariadb
npm i -s @mikro-orm/core @mikro-orm/mariadb     # for mysql/mariadb
npm i -s @mikro-orm/core @mikro-orm/postgresql  # for postgresql
npm i -s @mikro-orm/core @mikro-orm/sqlite      # for sqlite
```

## Add to tsconfig.json 👇

```
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
"esModuleInterop": true,
```

## CLI commands 🤓

```
npx mikro-orm migration:create    # create new migration with current schema
npx mikro-orm migration:up        # migrate up to the latest version
npx mikro-orm migration:down      # migrate one step down
npx mikro-orm migration:list      # List all executed migrations
npx mikro-orm migration:pending   # List all pending migrations
npx mikro-orm migration:fresh     # Drop the database and migrate up to the latest version
```

## mikro-orm.config

```typescript
export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // store migrations here
    pattern: /^[w-]+\d+\.[tj]s$/ // accepst TS and JS files
  },
  entities: [Insert, Entities, Here], // each entity must be imported and included in this array
  dbName: 'my_db_name',
  type: 'mysql, postgresql, etc.',
  debug: process.env.NODE_ENV !== 'production';
  host: process.env.DB_HOST, // stored in .env
  port: 3306,
  user: 'admin, root, etc',
  password: process.env.DB_PASS, // stored in .env
  allowGLobalContext: true
} as Parameters<typeof MikroORM.init>[0] // ben awad TS black magic
```

## Entities

Entities are simple javascript objects without restrictions and without the need to extend base classes. Every entity is required to have a primary key.

```typescript
@Entity() // MikroORM decorator
export class ClassNameHere {
  @PrimaryKey() // MikroORM decorator
  id!: number // required

  @Property({ type: 'date' }) // MikroORM decorator with prop type for migration tool
  createdAt? = new Date() // optional

  @Property({ type: 'date', onUpdate: () => new Date() }) // MikroORM decorator with onUpdate function
  updatedAt? = new Date() // optional

  @Property() // MikroORM decorator
  title!: string // required
}
```

## Controllers

```typescript
export const exampleEndpoint = async () => {
  const { first, second } = req.body // destructure request body into separate variables
  if (!first) return res.json({ message: 'Missing title' }) // error handling for required first prop
  if (!second) return res.json({ message: 'Missing description' }) // error handling for required second prop

  try {
    const orm = await MikroORM.init(mikroConfig) // initialize MikroORM
    const newRecord = { first, second } // new record to insert
    const inserted = await orm.em.create(EntityNameHere, newPost) // insert record into database
    if (!inserted) return res.json({ message: 'Insertion failed' }) // error handling
    await orm.em.persistAndFlush(post) // persist record insertion and flush
    res.json({ message: 'Post successfully created' }) // send successful response
  } catch (err) {
    throw new Error(err.message) // handle miscellaneous errors
  }
}
```
