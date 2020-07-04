import {
    BuildComponent
} from "../module-builder";

export default BuildComponent({
        name: "main",
        scope: {},
        path: "main/main",
        controller: "MainController",
    },
    [
        "$scope",
        function ($scope) {
            $scope.menu = [{
                    name: "home",
                    url: "/",
                    icon:"fa-home"
                },
                {
                    name: "about me",
                    url: "/about",
                    icon:"fa-newspaper-o"
                },
                {
                    name: "my skill",
                    url: "/skill",
                    icon:"fa-connectdevelop"
                },
                {
                    name: "my project",
                    url: "/projects",
                    icon:"fa-object-group"
                },
                {
                    name: "contact me",
                    url: "/contact",
                    icon:"fa-object-group"
                },
            ];
            $scope.activeClass = function (url) {
                return url === location.pathname
            }
        },
    ]
);