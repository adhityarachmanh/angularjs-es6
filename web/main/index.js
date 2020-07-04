import { BuildComponent } from "../module-builder";
import main from "./main";

const TEMPLATE = [
  main,
  BuildComponent(
    {
      name: "mainLogin",
      scope: {},
      path: "main/main-login",
      controller: "",
    },
    []
  ),
];

export default TEMPLATE;
