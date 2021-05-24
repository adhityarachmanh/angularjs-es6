const $routeFunction = (routes) => {
  return angular.module('routing', []).config([
    "$routeProvider", "$locationProvider", "C", ($routeProvider, $locationProvider, CONFIG) => {
      angular.forEach(routes, (objRoute) => {
        var obj = {};
        angular.forEach(objRoute[1], (value, key) => {
          if (key == 'component') {
            obj.template = value.template;
            obj.controller = value.component;
          } else if (key == 'template') {
            obj.type = value;
          } else {
            obj[key] = value;
          }
        })
        $routeProvider.when(objRoute[0], obj);
      })
      $routeProvider.otherwise("/404");
      $locationProvider.html5Mode(true);
    }
  ]).name

}
export default $routeFunction;