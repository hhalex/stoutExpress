const packageName = "com.beerries.databeer";
const classpathPrefix = "/tmp/classpath_" + packageName;

let sbt = startSbt({
  sh: "sbt -DdevMode=true",
  watch: ["build.sbt"]
});

let compile = sbt.run({
  command: "compile",
  watch: ["**/*.scala"]
});

let generateClasspath = sbt.run({
  name: "classpaths",
  command: "writeClasspath"
});

let database = runServer({
  name: "localDB",
  httpPort: 5488,
  sh:
    "java -cp `cat " +
    classpathPrefix +
    ".localdb` " +
    packageName +
    ".localdb.LocalDB"
}).dependsOn(generateClasspath);

let yarn = run({
  sh: "yarn install",
  watch: "package.json"
});

let front = webpack(
  {
    //watch: ["webpack.config.js", "src/main/js/**/*.*", "src/main/html/**/*.*"]
  }
).dependsOn(yarn);

let server = runServer({
  httpPort: 8888,
  sh:
    "java -cp `cat " +
    classpathPrefix +
    ".core` " +
    packageName +
    ".core.ServerDataBeer",
  env: {
    HTTP_PORT: 8888,
    POSTGRES_HOST: "localhost",
    POSTGRES_PORT: "5488",
    POSTGRES_DATABASE: "databeer",
    POSTGRES_USER: "root",
    POSTGRES_PASSWORD: "password"
  }
}).dependsOn(compile, generateClasspath, database);

proxy(server, 8080).dependsOn(front);
