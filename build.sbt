val Http4sVersion = "0.17.0-RC1"

val devMode = settingKey[Boolean]("Some build optimization are applied in devMode.")
val writeClasspath = taskKey[File]("Write the project classpath to a file.")

lazy val commonSettings = Seq(
  organization := "com.beerries.databeer",
  version := "dev-SNAPSHOT",
  scalaVersion := "2.12.3",
  scalacOptions ++= Seq(
    "-deprecation",
    "-encoding",
    "UTF-8",
    "-feature",
    "-unchecked",
    "-Xlint",
    "-Yno-adapted-args",
    "-Ywarn-dead-code",
    "-language:postfixOps",
    "-Xfuture",
    "-Ywarn-unused-import"
  ),
  devMode := Option(System.getProperty("devMode")).isDefined,
  writeClasspath := {
    val f = file(s"/tmp/classpath_${organization.value}.${name.value}")
    val classpath = (fullClasspath in Runtime).value
    IO.write(f, classpath.map(_.data).mkString(":"))
    streams.value.log.info(f.getAbsolutePath)
    f
  }
)

lazy val databeerLocaldb = {
  (project in file("localdb"))
    .settings(commonSettings: _*)
    .settings(
      name := "localdb",
      libraryDependencies ++= Seq(
        "ru.yandex.qatools.embed" % "postgresql-embedded" % "1.23"
      )
    )
}

lazy val databeerCore =
  (project in file("core"))
    .settings(commonSettings: _*)
    .settings(
      name := "core",
      libraryDependencies ++= Seq(
        "org.http4s"     %% "http4s-blaze-server",
        "org.http4s"     %% "http4s-circe",
        "org.http4s"     %% "http4s-dsl"
      ).map(_ % Http4sVersion),
      libraryDependencies ++= Seq(
        "ch.qos.logback" %  "logback-classic"     % "1.2.1"
      ),
      libraryDependencies ++= Seq(
        "org.tpolecat" %% "doobie-core-cats",
        "org.tpolecat" %% "doobie-hikari-cats",
        "org.tpolecat" %% "doobie-postgres-cats"
      ).map(_ % "0.4.2"),
      libraryDependencies ++= Seq(
        "org.scalatest" %% "scalatest" % "3.0.1"
      ).map(_ % "test"),
      resourceGenerators in Compile += Def.task {
        if (devMode.value) {
          streams.value.log.warn(s"Skipping webpack resource generation.")
          Nil
        } else {
          def listFiles(dir: File): Seq[File] =
            IO.listFiles(dir)
              .flatMap(f =>
                if (f.isDirectory) listFiles(f)
                else Seq(f))
          val webpackOutputDir: File = (resourceManaged in Compile).value / "public"
          val logger = new ProcessLogger {
            override def error(s: => String): Unit = ()
            override def buffer[T](f: => T): T = f
            override def info(s: => String): Unit = streams.value.log.info(s)
          }
          logger.info(s"Generating UI assets to $webpackOutputDir...")
          assert(s"yarn install" ! logger == 0, "yarn failed")
          logger.info("Running webpack...")
          assert(s"./node_modules/webpack/bin/webpack.js --output-path $webpackOutputDir --bail" ! logger == 0,
                 "webpack failed")
          listFiles(webpackOutputDir)
        }
      }.taskValue
    )
    .dependsOn(databeerLocaldb % "test->test")

lazy val root =
  (project in file("."))
    .settings(commonSettings: _*)
    .settings(
      publishArtifact := false
    )
    .aggregate(databeerCore, databeerLocaldb)