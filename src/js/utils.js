'use strict'

export default class Utils {
  // Return a random integer between [min, max)
  static getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  // Return a random integer between [min, max]
  static getRandomIntInclusive (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static getRandomMatrix (size) {
    let matrix = []

    for (let x = 0; x < size; x++) {
      matrix[x] = []
      for (let y = 0; y < size; y++) {
        matrix[x][y] = Utils.getRandomIntInclusive(0, 1)
      }
    }

    return matrix
  }
}
