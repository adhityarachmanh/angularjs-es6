import {
  BuildTemplate
} from "../../shr/module-builder";

const TEMPLATES = [
  BuildTemplate("template1", {
      restrict: "E",
      scope: (scope) => scope,
      template: require('./template-1.html'),
      controller: "",
    },
    [() => {}]
  ),
  BuildTemplate("template2", {
      restrict: "E",
      scope: (scope) => scope,
      template: require('./template-2.html'),
      controller: "",
    },
    [() => {}]
  ),
  BuildTemplate("template3", {
      restrict: "E",
      scope: (scope) => scope,
      template: require('./template-3.html'),
      controller: "",
    },
    [() => {}]
  ),
];

export default TEMPLATES;