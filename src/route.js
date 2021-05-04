import $routeFunction from "./shr/routeFunction"
import HomeComponent from "./views/home"
import S404Component from "./views/404"


export default $routeFunction([
    {
        url: "/",
        template: {
            path: "views/home.html",
            type: 1
        },
        controller: {
            name: "HomeController",
            component: HomeComponent
        }
    },
    {
        url: "/404",
        template: {
            path: "views/404.html",
            type: 3
        },
        controller: {
            name: "404Controller",
            component: S404Component
        }
    }
])