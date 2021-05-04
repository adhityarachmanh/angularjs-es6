import $routeFunction from "./shr/routeFunction"
import HomeComponent from "./pages/home"
import S404Component from "./pages/404"


export default $routeFunction([
    {
        url: "/",
        template: {
            path: "pages/home.html",
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
            path: "pages/404.html",
            type: 3
        },
        controller: {
            name: "404Controller",
            component: S404Component
        }
    }
])