import CONFIG from "./config";

const BuildFactory = (name, factory, MODULES = []) => {
  return angular
    .module(CONFIG.MODULE_NAME + ".factory." + name, MODULES)
    .factory(name, factory).name;
};

const BuildComponent = (config, ctrl, MODULES = []) => {
  const { name, scope, path: dir, controller: cName } = config;
  return angular
    .module(CONFIG.MODULE_NAME + ".component." + name, MODULES)
    .directive(name, function () {
      return {
        restrict: "E",
        template: require(`./${dir}.html`),
        controller: cName,
        controllerAs: name,
        scope: scope,
      };
    })
    .controller(cName, ctrl).name;
};

const BuildPage = (config, ctrl, MODULES = []) => {
  const { url, path: dir, controller: cName } = config;
  var name = dir.split("/");
  name = name[name.length - 1];
  return angular
    .module(CONFIG.MODULE_NAME + ".page." + name, MODULES)
    .config([
      "$locationProvider",
      "$routeProvider",
      function ($locationProvider, $routeProvider) {
        //daftarkan home route
        $routeProvider
          .when(url, {
            template: require(`./${dir}.html`),
            controller: cName,
            controllerAs: name,
          })
          .otherwise({
            redirectTo: "/404",
          });
        $locationProvider.html5Mode(true);
      },
    ])
    .controller(cName, ctrl).name;
};

export { BuildPage, BuildComponent, BuildFactory };
