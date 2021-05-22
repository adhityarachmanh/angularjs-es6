import $routeFunction from "../shr/routeFunction";
import home from "./home/home";
import post from "./post/post";
import p404 from "./404";
import config from "./config";

const routes = [
  [
    "/", {
      c: "HomeController",
      t: home.template,
      s: home.controller,
      p: 1
    }
  ],
  [
    "/post/:id", {
      c: "PostController",
      t: post.template,
      s: post.controller,
      p: 2
    }
  ],
  [
    "/404", {
      c: "404Controller",
      t: p404.template,
      s: p404.controller,
      p: 3
    }

  ]
];
export default $routeFunction(routes, config);