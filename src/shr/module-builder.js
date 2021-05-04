import CONFIG from "../../webpack-config";
const BuildService = (name, service, MODULES = []) => {
  return angular
    .module(CONFIG.MODULE_NAME + ".service." + name, MODULES)
    .service(name, service).name;
};

const BuildFactory = (name, factory, MODULES = []) => {
  return angular
    .module(CONFIG.MODULE_NAME + ".factory." + name, MODULES)
    .factory(name, factory).name;
};

const BuildTemplate = (config, ctrl, MODULES = []) => {
  const { name, scope, path: dir, controller: cName } = config;
  return angular
    .module(CONFIG.MODULE_NAME + ".template." + name, MODULES)
    .directive(name, function () {
      return {
        restrict: "E",
        template: require('../' + dir),
        controller: cName,
        controllerAs: name,
        scope: scope,
      };
    })
    .controller(cName, ctrl).name;
};


export {  BuildTemplate, BuildFactory, BuildService };
