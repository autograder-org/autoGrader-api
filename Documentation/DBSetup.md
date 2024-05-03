### Installing Postgresql

[<- go back](../README.md)

1. We install postgresql using the following command `brew install postgresql@16`
2. We run the command ` brew services start postgresql@16` to start the postgres service now and also restart it whenever the laptop restarts
3. We notice that the `psql` is present in the following path `/opt/homebrew/Cellar/libpq/16.1_1/bin` - so we need to go ahead and add it to the system wide paths ( we modify this as the super user )
```shell
   
/usr/local/bin
/System/Cryptexes/App/usr/bin
/usr/bin
/bin
/usr/sbin
/sbin
/opt/homebrew/Cellar/libpq/16.1_1/bin

```
   
   Now when we type `which psql` we see this
```shell
$ which psql
/opt/homebrew/Cellar/libpq/16.1_1/bin/psql
```

4. *ERROR!*: Initially when we try to access `psql` we get the error message `psql psql: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL:  database "dhruvparthasarathy" does not exist`
5. Found this [stackoverflow](https://stackoverflow.com/questions/17633422/psql-fatal-database-user-does-not-exist) issue that resolved this error.
6. psql is now running on `port 5432`

```shell
(base) dhruvparthasarathy@Dhruvs-MacBook-Air ~ % psql -h localhost
psql (16.1)
Type "help" for help.

dhruvparthasarathy=# help
You are using psql, the command-line interface to PostgreSQL.
Type:  \copyright for distribution terms
       \h for help with SQL commands
       \? for help with psql commands
       \g or terminate with semicolon to execute query
       \q to quit
dhruvparthasarathy=#
```


7. We can also get this by running the command `SELECT setting FROM pg_settings WHERE name='port'`

### Setting up roles and the database

First we check which roles are available and their attributes. 

Here we see that currently there is one role that has the superuser attribute. But for this assignment we do not want to use it but we want to create a new role that only has the Create and modify DB attributes attached to it.

We create a new role called assignment2 and we use it for this assignment. 
`CREATE ROLE assignment2 WITH CREATEDB NOSUPERUSER LOGIN PASSWORD 'assignment2';`

```shell
dhruvparthasarathy=# \dg;
                                  List of roles
     Role name      |                         Attributes
--------------------+------------------------------------------------------------
 assignment2        | Create DB
 dhruvparthasarathy | Superuser, Create role, Create DB, Replication, Bypass RLS
```

Followed this [stackoverflow thread](https://stackoverflow.com/questions/44051059/how-do-you-change-a-user-in-postgresql) to find out how to switch roles.

What is the difference between a table, a tablespace, a database and a schema in postgres ?

Common psql commands: 
```
	\d[S+]                 list tables, views, and sequences
	\ds[S+] [PATTERN]      list sequences
	\dt[S+] [PATTERN]      list tables
	\du[S+] [PATTERN]      list roles
	\l[+]   [PATTERN]      list databases
	\dn[S+] [PATTERN]      list schemas

Connection
  \c[onnect] {[DBNAME|- USER|- HOST|- PORT|-] | conninfo}
                         connect to new database (currently "assignment2")
  \conninfo              display information about current connection
  \encoding [ENCODING]   show or set client encoding
  \password [USERNAME]   securely change the password for a user
```

Here is some information about [what is a schema](https://www.postgresqltutorial.com/postgresql-administration/postgresql-schema/)

```shell
assignment2=> select * from information_schema.schemata;
 assignment2  | information_schema | dhruvparthasarathy |                               |                              |                            |
 assignment2  | pg_catalog         | dhruvparthasarathy |                               |                              |                            |
 assignment2  | public             | pg_database_owner  |                               |                              |                            |
```

Further we go a step ahead and grant all privileges to the new role that we created on the public schema. 
```
GRANT ALL PRIVILEGES ON SCHEMA public TO assignment2;
GRANT
```

