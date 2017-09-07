package com.beerries.databeer.core

import doobie.imports._
import cats._, cats.data._, cats.implicits._
import fs2.interop.cats._

import scala.util.{Try}

trait Database {
  def run[A](statements: ConnectionIO[A]): A
}

case class DatabaseConfig(host: String, port: Int, database: String, user: String, password: String)

object Database {

  def connect(c: DatabaseConfig): Database = new Database {
    val xa = DriverManagerTransactor[IOLite](
      "org.postgresql.Driver",
      s"jdbc:postgresql://${c.host}:${c.port}/${c.database}",
      c.user,
      c.password
    )
    def run[A](statements: ConnectionIO[A]) = statements.transact(xa).unsafePerformIO

    run[Int](schemaHopsFamilyDrop.run *> schemaHopsFamily.run)
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

  val schemaHopsFamily: Update0 = sql"""
    CREATE TABLE hopsFamily (
      id          SERIAL,
      name        VARCHAR(1000) NOT NULL UNIQUE,
      alpha_lo    float8 NOT NULL,
      alpha_hi    float8 NOT NULL
    );
  """.update
  val schemaHopsFamilyDrop: Update0 = sql"""
    DROP TABLE IF EXISTS hopsFamily
  """.update

}