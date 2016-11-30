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
  }
}
