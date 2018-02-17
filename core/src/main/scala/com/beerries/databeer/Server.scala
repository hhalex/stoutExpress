package com.beerries.databeer.core
import java.util.concurrent.{ExecutorService, Executors}

import cats.effect.IO
import fs2.StreamApp.ExitCode

import scala.util.Properties.envOrNone
import fs2.{Stream, StreamApp}
import org.http4s.server.blaze.BlazeBuilder

import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.ExecutionContext

object ServerDataBeer extends StreamApp[IO] {

  val port : Int              = envOrNone("HTTP_PORT") map (_.toInt) getOrElse 8080
  val ip   : String           = "0.0.0.0"
  val pool : ExecutorService  = Executors.newCachedThreadPool()
  val dbConfig = Database.configFromEnv
  val db = Database.connect(dbConfig)

  override def stream(args: List[String], requestShutdown: IO[Unit]): Stream[IO, ExitCode] =
    BlazeBuilder[IO]
      .bindHttp(port, ip)
      .mountService(HelloWorld(db).service)
      .withExecutionContext(ExecutionContext.fromExecutorService(pool))
      .serve
}
