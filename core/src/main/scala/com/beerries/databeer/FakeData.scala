package com.beerries.databeer

import com.beerries.databeer.core.HopsCategory

object FakeData {
  def hopsCategories(): Seq[HopsCategory] = {
    List(
      HopsCategory("Citra", (10, 15)),
      HopsCategory("Centennial", (12, 13)),
      HopsCategory("Saaz", (2, 3)),
      HopsCategory("Challenger", (6, 7)),
      HopsCategory("Cascade", (2, 3))
    )
  }
}
