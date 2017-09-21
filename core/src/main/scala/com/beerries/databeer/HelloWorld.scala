package com.beerries.databeer.core

import io.circe._
import org.http4s._
import org.http4s.circe._
import org.http4s.dsl._

trait HelloWorld {
  val service: HttpService
}

object HelloWorld {
  def apply(db: Database) = new HelloWorld {
    private val hops = Hops(db)
    val service = HttpService {
      case GET -> Root =>
        Ok("Woot woot!!!")
      case GET -> Root / "hello" / name =>
        Ok(Json.obj("message" -> Json.fromString(s"Hello, ${name}")))
      case GET -> Root / "hops" / "add" / name =>
        Ok(db.run[Int](hops.add(name, 3.5, 8.5).run).toString())
      case GET -> Root / "view"  =>
        Ok(Json.obj(BeerXML.getAllHops().groupBy(_.name).mapValues(v => Json.fromInt(v.length)).toSeq:_*))
    }
  }
}
