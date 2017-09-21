package com.beerries.databeer.core

import java.io.File

import scala.io.Source
import scala.util.{Failure, Success, Try}
import scala.xml.{Elem, XML}

object BeerXML {
  case class Hop(name: String, ibu: Double, hsi: Double, country: String)
  private def getListOfFiles(dir: String): List[String] = {
    val d = new File(dir)
    if (d.exists && d.isDirectory) {
      d.listFiles.filter(_.isFile).map {
        f => Source.fromFile(dir + "/" + f.getName()).getLines().mkString
      }.toList
    } else {
      List.empty
    }
  }
  val files = getListOfFiles("./data")

  val filterEntities = (file: String) => file.replaceAll("&[^;]+;", "")
  val recipes = files.map(filterEntities).map {
    file => {
      Try(XML.loadString(file)) match {
        case Success(elem) => Some(elem)
        case Failure(e) => {
          println("Error in file : " + e.getMessage())
          None
        }
      }
    }
  }.flatten

  def extractHopsFromRecipe(beerXmlTree: Elem): Seq[Hop] = {
    beerXmlTree \\ "Hops" map {
      hop =>
        Hop(
          name = (hop \ "F_H_NAME").text,
          country = (hop \ "F_H_ORIGIN").text,
          ibu = (hop \ "F_H_IBU_CONTRIB").text.toDouble,
          hsi = (hop \ "F_H_HSI").text.toDouble
        )
    }
  }

  def getAllHops(): Seq[Hop] = recipes flatMap extractHopsFromRecipe
}
