import { BuildTemplate } from "../shr/module-builder";

const TEMPLATES = [
  BuildTemplate(
    {
      name: "template1",
      scope: {},
      path: "templates/template-1.html",
      controller: "TemplateOneController",
    },
    [function () {}]
  ),
  BuildTemplate(
    {
      name: "template2",
      scope: {},
      path: "templates/template-2.html",
      controller: "",
    },
    [function () {}]
  ),
  BuildTemplate(
    {
      name: "template3",
      scope: {},
      path: "templates/template-3.html",
      controller: "",
    },
    [function () {}]
  ),
];

export default TEMPLATES;
