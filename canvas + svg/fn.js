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
   * fn.identity
   */
  identity: function(x) {
    return x;
  },
  /**
   * fn.avoidCollisions
   */
  avoidCollisions: function(_state) {  /* prevent collission*/
              var box = d3.select("text").node().getBBox();
              _state.data.filter(function(d) {
                return d.y > box.y;
              })
              .filter(function(d) {
                return d.x > box.x;
              })
              .filter(function(d) {
                return d.x < box.x + box.width
              })
              .map(function(d){
                d.fy = d.y; 
                d.fx = d.x;
              })
            }
}
