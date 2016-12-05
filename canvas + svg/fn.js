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
  }
}


// var x = 1;
// var y = 2;

// function sumA(a, b) {
//   return x + a + b;
// }
// function sumB(a, b) {
//   x = a + b;
//   return x + a + b;
// }

// sumA(1,4); // 6
// sumB(3,5); // 16
// sumA(1,4); // 12

// s = sum5(1,3); // s = 4


