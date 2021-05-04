import angular from "angular";
import "angular-route";
import "bootstrap";
import "./assets/sass/app.scss";
import CONFIG from "./config";
import INDEX_MODULE from "./index";
import SHR_MODULE from "./shr";
import ROUTES_MODULE from "./route";
import TEMPLATES_MODULE from "./templates";
import SERVICES_MODULE from "./services";

//merge semua module
let MODULES = ["ngRoute", INDEX_MODULE];
MODULES = MODULES.concat(SHR_MODULE);
MODULES = MODULES.concat(ROUTES_MODULE);
MODULES = MODULES.concat(TEMPLATES_MODULE);
MODULES = MODULES.concat(SERVICES_MODULE);

console.log("LIST MODULE : ", MODULES);

angular.module(CONFIG.MODULE_NAME, MODULES)
