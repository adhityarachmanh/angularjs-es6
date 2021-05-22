/*
mod : Module Builder
cre : arh 
ver : 0
*/
export const BuildService = (name, service) => {
  return angular
    .module("service." + name, [])
    .service(name, service).name;
};

export const BuildFactory = (name, factory) => {
  return angular
    .module("factory." + name, [])
    .factory(name, factory).name;
};

export const BuildTemplate = (name, config, ctrl) => {

  return angular
    .module("template." + name, [])
    .directive(name, () => config)
    .controller(config.controller, ctrl).name;
};