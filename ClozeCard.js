
function ClozeCard(text, cloze) {
  this.cloze = cloze;
  this.text = text;
  this.partial = this.text.replace(cloze, "...");
}


module.exports = ClozeCard;