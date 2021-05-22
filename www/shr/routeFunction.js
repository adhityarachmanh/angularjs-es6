function $routeFunction(routes, config) {
  var keyMap = {
    c: 'controller',
    t: 'template',
    u: 'templateUrl',
    s: '_controller',
    r: 'resolve',
    p: 'type'
  };
  const _routes = [];
  var i = 0;
  angular.forEach(routes, (objRoute) => {
    var obj = {};
    angular.forEach(objRoute[1], (value, key) => {
      if (keyMap[key]) {
        if (key == 'u') {
          value = config.app + value + config.v;
        } 
        key = keyMap[key];
      }
      obj[key] = value;
    })

    var name = "route_" + i.toString();
    _routes.push(angular
      .module("page." + name, [])
      .config([
        "$locationProvider",
        "$routeProvider",
        function ($locationProvider, $routeProvider) {
          //daftarkan route
          $routeProvider.when(objRoute[0], obj);
          $routeProvider.otherwise("/404");
          $locationProvider.html5Mode(true);
        },
      ])
      .controller(obj.controller, obj._controller).name)
    i++;
  })
  return _routes;
}
export default $routeFunction;