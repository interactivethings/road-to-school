  
export function isolate(data, aForce, filter) {
    var initialize = aForce.initialize;
    aForce.initialize = function() { initialize.call(aForce, data.filter(filter)); };
    return aForce;
  }