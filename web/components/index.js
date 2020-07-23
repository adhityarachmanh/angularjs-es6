import { BuildComponent } from "../module-builder";
import templateOne from "./template-one";

const COMPONENTS = [
  templateOne,
  BuildComponent(
    {
      name: "templateTwo",
      scope: {},
      path: "components/template-two",
      controller: "",
    },
    []
  ),
  BuildComponent(
    {
      name: "templateThree",
      scope: {},
      path: "components/template-three",
      controller: "",
    },
    []
  ),
];

export default COMPONENTS;
