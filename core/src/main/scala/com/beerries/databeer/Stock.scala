package com.beerries.databeer

import com.beerries.databeer.core.{Database, HopsCategory, ResourceSchema}
import doobie.imports._

trait Stock {
  def quantity(): Int
  def use(amount: Int): Int
  def finish(): Int
}
/*
class HopStock extends Stock {
  val hopsCategory: HopsCategory
}*/

case class HopStockDB(db: Database) {
  def add(name : String, alpha_lo: Double, alpha_hi: Double): Update0 =
    sql"insert into hopsFamily (name, alpha_lo, alpha_hi) values ($name,$alpha_lo,$alpha_hi)".update
  def all(): Query0[String] = sql"select name from hopsFamily".query[String]
}

object HopStockSchema extends ResourceSchema {
  def create(): Update0 = sql"""
    CREATE TABLE hopsFamily (
      id          SERIAL,
      name        VARCHAR(1000) NOT NULL UNIQUE,
      alpha_lo    float8 NOT NULL,
      alpha_hi    float8 NOT NULL
    );
  """.update
  def drop(): Update0 = sql"""
    DROP TABLE IF EXISTS hopsFamily
  """.update
}