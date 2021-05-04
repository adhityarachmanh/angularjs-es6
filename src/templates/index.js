import { BuildTemplate } from "../shr/module-builder";

const TEMPLATES = [
  BuildTemplate(
    {
      name: "templateOne",
      scope: {},
      path: "templates/template-one.html",
      controller: "TemplateOneController",
    },
    [function () {}]
  ),
  BuildTemplate(
    {
      name: "templateTwo",
      scope: {},
      path: "templates/template-two.html",
      controller: "",
    },
    [function () {}]
  ),
  BuildTemplate(
    {
      name: "templateThree",
      scope: {},
      path: "templates/template-three.html",
      controller: "",
    },
    [function () {}]
  ),
];

export default TEMPLATES;
