/**
 * A collection of functional programming helper functions
 */
var fn = {
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
    d.fy = d.y - Math.abs(Math.random()) * 10;
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
