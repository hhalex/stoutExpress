package com.beerries.databeer.core

import cats.effect.IO
import doobie.imports._
import cats.implicits._

import scala.util.Try

trait Database {
  def run[A](statements: ConnectionIO[A]): A
}

case class DatabaseConfig(host: String, port: Int, database: String, user: String, password: String)

object Database {

  // Fetch all tables to create before using the app
  def collectSchemas(): Seq[ResourceSchema] = {
    List(HopsCategorySchema)
  }

  def connect(c: DatabaseConfig): Database = new Database {
    val xa = Transactor.fromDriverManager[IO](
      "org.postgresql.Driver",
      s"jdbc:postgresql://${c.host}:${c.port}/${c.database}",
      c.user,
      c.password
    )
    def run[A](statements: ConnectionIO[A]) = statements.transact(xa).unsafeRunSync

    // Init database with all tables
    run[Int](
      collectSchemas()
        .foldLeft(sql"select 42".query[Int].unique)(
          (acc, r) => acc *> (r.drop().run *> r.create().run)
        )
    )
  }

  def configFromEnv: DatabaseConfig = {
    def env(variable: String, default: Option[String] = None) =
      Option(System.getenv(variable)).orElse(default).getOrElse(sys.error(s"Missing env ${'$' + variable}"))
    DatabaseConfig(
      env("POSTGRES_HOST", Some("localhost")),
      Try(env("POSTGRES_PORT", Some("5432")).toInt).getOrElse(5432),
      env("POSTGRES_DATABASE"),
      env("POSTGRES_USER"),
      env("POSTGRES_PASSWORD")
    )
  }
}

trait ResourceSchema {
  def create(): Update0
  def drop(): Update0
}