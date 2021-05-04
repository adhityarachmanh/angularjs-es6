import $routeFunction from "./shr/routeFunction";
import HomeController from "./views/home";
import PostController from "./views/post";
import P404Controller from "./views/404";
import SigninController from "./views/auth/signin";

export default $routeFunction([
  {
    url: "/",
    template: {
      path: "views/home.html",
      type: 1,
    },
    controller: {
      name: "HomeController",
      component: HomeController,
    },
  },
  {
    url: "/post/:id",
    template: {
      path: "views/post.html",
      type: 1,
    },
    controller: {
      name: "PostController",
      component: PostController,
    },
  },
  {
    url: "/signin",
    template: {
      path: "views/auth/signin.html",
      type: 2,
    },
    controller: {
      name: "SigninController",
      component: SigninController,
    },
  },
  {
    url: "/404",
    template: {
      path: "views/404.html",
      type: 3,
    },
    controller: {
      name: "404Controller",
      component: P404Controller,
    },
  },
]);
