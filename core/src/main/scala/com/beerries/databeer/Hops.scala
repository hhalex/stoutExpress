package com.beerries.databeer.core

import doobie.imports._

trait Hops {
  def add(name : String, alpha_lo: Double, alpha_hi: Double): Update0
}

object Hops {
  def apply(db: Database) = new Hops {
    def add(name : String, alpha_lo: Double, alpha_hi: Double): Update0 =
      sql"insert into hopsFamily (name, alpha_lo, alpha_hi) values ($name,$alpha_lo,$alpha_hi)".update
  }
}
