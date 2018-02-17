package com.beerries.databeer.core

import com.beerries.databeer.FakeData
import io.circe.syntax._
import io.circe.generic.auto._
import org.http4s.circe._
import cats.effect._
import org.http4s._
import org.http4s.dsl.io._
import scala.concurrent.ExecutionContext.Implicits.global

trait HelloWorld {
  val service: HttpService[IO]
}

object HelloWorld {

  def apply(db: Database) = new HelloWorld {
    private val hops = HopsCategoryDB(db)
    val service = HttpService[IO] {
      case GET -> Root / "hello" / name =>
        Ok(("message" -> s"Hello, ${name}").asJson)
      case GET -> Root / "api" / "hops" / "categories" =>
        Ok(FakeData.hopsCategories().asJson)
      case GET -> Root / "hops" / "add" / name =>
        Ok(db.run[Int](hops.add(name, 3.5, 8.5).run).toString())
      case GET -> Root / "hops" / "all" =>
        Ok(db.run[List[String]](hops.all().list).toString())
      /*case GET -> Root / "view"  =>
        Ok(Json.obj(BeerXML.getAllHops().groupBy(_.name).mapValues(v => Json.fromInt(v.length)).toSeq:_*))*/
    }
  }
}
