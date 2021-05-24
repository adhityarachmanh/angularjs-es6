/*
mod : Module Builder
cre : arh 
ver : 0
*/
import $routeFunction from "./routeFunction";

export const Service = (name, service) => {
  return angular
    .module(name + ".service", [])
    .service(name, service).name;
};

export const Factory = (name, factory) => {
  return angular
    .module(name + ".factory", [])
    .factory(name, factory).name;
};

export const Constant = (name, constant) => {
  return angular
    .module("constant." + name, [])
    .constant(name, constant).name;
};


export const Directive = (name, config, ctrl) => {

  return angular
    .module(name + ".template", [])
    .directive(name, () => config)
    .controller(config.controller, ctrl).name;
};


export const BuildConfig = (name, config) => {
  return angular
    .module(name + ".config", []).config(config).name;
};


export const Component = (config, controller) => {
  return {
    template: config.template,
    component: angular
      .module(config.name, []).controller(config.name, controller).name
  };
};

export const NgModule = (name, obj) => {
  // console.log(obj);
  var allowKey = [
    "components",
    "imports",
    "index",
    "routes",
    "services",
    "config",
    "constants",
    "factory",
    "directives"
  ]
  let MODULE_MERGE = [];

  angular.forEach(obj, (value, key) => {
    if (allowKey.includes(key)) {
      if (key == 'components') {
        MODULE_MERGE.push(...value.map(x => x.component))
      } else if (key == 'routes') {
        MODULE_MERGE.push($routeFunction(value))
      } else if (key == 'index') {
        MODULE_MERGE.push(value.component)
      } else {
        MODULE_MERGE.push(...value)
      }
    } else {
      console.error(`Key ${key} not allowed in NgModule`)
    }
  })
  console.log(MODULE_MERGE);
  return angular.module(name, MODULE_MERGE);
}