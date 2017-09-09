
function ClozeCard(text, cloze) {
  this.cloze = cloze;
  this.text = text;
  this.partial = this.text.replace(new RegExp(this.cloze, 'gi'), "______");
}


module.exports = ClozeCard;