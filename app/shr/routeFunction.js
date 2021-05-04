import CONFIG from "../config";

function $routeFunction(routes) {
    const _routes = []
    for (let i = 0; i < routes.length; i++) {
        const config = routes[i];
        const { url, template, controller } = config;
        let name = template.path.split("/");
        name = name[name.length - 1].split(".")
        name = name[0]
        _routes.push(angular
            .module(CONFIG.MODULE_NAME + ".page." + name, [])
            .config([
                "$locationProvider",
                "$routeProvider",

                function ($locationProvider, $routeProvider) {
                    //daftarkan home route
                    $routeProvider
                        .when(url, {
                            template: require('../' + template.path),
                            controller: controller.name,
                            controllerAs: name,
                            type: template.type
                        })
                        .otherwise({
                            redirectTo: "/404",
                        });
                    // $locationProvider.html5Mode(true);
                },
            ])
            .controller(controller.name, controller.component).name)

    }
    return _routes
}

export default $routeFunction