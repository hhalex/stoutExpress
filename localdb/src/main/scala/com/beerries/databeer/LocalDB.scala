package com.beerries.databeer.localdb

import ru.yandex.qatools.embed.postgresql._
import ru.yandex.qatools.embed.postgresql.config._
import ru.yandex.qatools.embed.postgresql.distribution.Version.Main.PRODUCTION

object LocalDB {
  def main(args: Array[String]): Unit = {
    val runtime = PostgresStarter.getDefaultInstance()
    val config = new PostgresConfig(
      PRODUCTION,
      new AbstractPostgresConfig.Net("localhost", 5488),
      new AbstractPostgresConfig.Storage("databeer"),
      new AbstractPostgresConfig.Timeout(),
      new AbstractPostgresConfig.Credentials("root", "password")
    )
    val pg = runtime.prepare(config).start()
    println(config)
    println("press [Ctrl+D] to stop...")
    while (System.in.read != -1) ()
    pg.stop()
  }
}