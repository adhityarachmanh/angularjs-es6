import { Directive } from "../../shr/module-builder";



export const Template1Directive = Directive("template1", {
    restrict: "E",
    scope: (scope) => scope,
    template: require('./template-1.html'),
    controller: "",
  },
  [() => {}]
);

export const Template2Directive = Directive("template2", {
    restrict: "E",
    scope: (scope) => scope,
    template: require('./template-2.html'),
    controller: "",
  },
  [() => {}]
);


export const Template3Directive = Directive("template3", {
    restrict: "E",
    scope: (scope) => scope,
    template: require('./template-3.html'),
    controller: "",
  },
  [() => {}]
);