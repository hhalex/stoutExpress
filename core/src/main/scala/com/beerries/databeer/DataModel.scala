package com.beerries.databeer.core

object DataModel {
  class Stock[Resource <: Crop]
  trait Use[Resource <: Crop] {
    val usedStock: Option[Stock[Resource]]
  }

  trait Crop
  trait Variety
  class HopVariety
  class HopCrop extends Crop

  trait Fermentable {}
  class MaltVariety
  class Cereal
  class CerealCrop extends Crop
  class MaltCrop extends CerealCrop

  case class Yeast()
  class MashDescription {}
  class BoilDescription {}
  class FermentationDescription {}

  trait MashExecution {}
  trait BoilExecution {}
  trait FermentationExecution {}
  trait RecipeDescription
  trait RecipeExecution {
    val hops: Seq[Use[HopCrop]]
    //val fermentables: Seq[Use[Fermentable]]
  }
}
