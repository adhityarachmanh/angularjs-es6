import { BuildTemplate } from "../shr/module-builder";

const TEMPLATES = [
  BuildTemplate(
    {
      name: "templateOne",
      scope: {},
      path: "templates/template-one.html",
      controller: "TemplateOneController",
    },
    () => { }
  ),
  BuildTemplate(
    {
      name: "templateTwo",
      scope: {},
      path: "templates/template-two.html",
      controller: "",
    },
    []
  ),
  BuildTemplate(
    {
      name: "templateThree",
      scope: {},
      path: "templates/template-three.html",
      controller: "",
    },
    []
  ),
];

export default TEMPLATES;
