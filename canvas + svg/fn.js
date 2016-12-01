/**
 * A collection of functional programming helper functions
 */
var fn = {
  /**
  * fn.changeText
  */
  changeText: function() {
    var professions = ["teacher", "doctor", "engineer", "musician", "artist", "journalist","pilot", "bookshop owner", "chef", "diplomat", "nurse", "kindergarden teacher"];
    var profession = professions[Math.floor(Math.random()*professions.length)];
    text.text(profession);
  },
	/**
   * fn.find
   */
  find: function(predicate, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (predicate(arr[i])) {
        return arr[i];
      }
    }
    return undefined;
  },
  /**
   * fn.fixAtBottom
   */
  fixAtBottom: function(d) {
    d.fx = d.x;
    d.fy = d.y - Math.random() * 10;
    return d;
  },
  /**
   * fn.identity
   */
  identity: function(x) {
    return x;
  },
  /**
  * fn.updateCircle
  */
  updateCircle: function() {
    circle
      .attr('cx', circleDatum.x)
      .attr('cy', circleDatum.y);
    text
      .attr('x', circleDatum.x)
      .attr('y', circleDatum.y);

    return circle, text;
  }
}
