package com.beerries.databeer.core
import java.util.concurrent.{ExecutorService, Executors}

import scala.util.Properties.envOrNone

import fs2.{Task, Stream}

import org.http4s.util.StreamApp
import org.http4s.server.blaze.BlazeBuilder
import scala.concurrent.ExecutionContext

object ServerDataBeer extends StreamApp {

  val port : Int              = envOrNone("HTTP_PORT") map (_.toInt) getOrElse 8080
  val ip   : String           = "0.0.0.0"
  val pool : ExecutorService  = Executors.newCachedThreadPool()
  val dbConfig = Database.configFromEnv
  val db = Database.connect(dbConfig)

  override def stream(args: List[String]): Stream[Task, Nothing] =
    BlazeBuilder
      .bindHttp(port, ip)
      .mountService(HelloWorld(db).service)
      .withExecutionContext(ExecutionContext.fromExecutorService(pool))
      .serve
}
