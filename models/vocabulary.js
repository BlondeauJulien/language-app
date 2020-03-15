class Vocabulary {
  constructor(
    word, 
    translation, 
    type, 
    phrases, 
    conjugationLink, 
    personalNote, 
    group, 
    level
  ) {
    this.word = word, 
    this.translation = translation, 
    this.type = type, 
    this.phrases = phrases, 
    this.conjugationLink = conjugationLink, 
    this.personalNote = personalNote, 
    this.group = group, 
    this.level = level
  }
}

module.exports = Vocabulary;