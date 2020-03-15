class Quiz {
  constructor(
    imageLink,
    answers,
    tags,
    level
  ) {
    this.imageLink = {
      imageLink,
      approuved: false,
    }, 
    this.answers = answers, 
    this.tags = tags,
    this.level = level
  }
}

module.exports = Quiz;