package com.beerries.databeer.core

import doobie.imports._

case class HopsCategory(name: String, alpha_lo: Double, alpha_hi: Double)

trait HopsCategoryDB {
  def add(name : String, alpha_lo: Double, alpha_hi: Double): Update0
}

object HopsCategoryDB {
  def apply(db: Database) = new HopsCategoryDB {
    def add(name : String, alpha_lo: Double, alpha_hi: Double): Update0 =
      sql"insert into hopsFamily (name, alpha_lo, alpha_hi) values ($name,$alpha_lo,$alpha_hi)".update
    def all(): Query0[String] = sql"select name from hopsFamily".query[String]
  }
}
