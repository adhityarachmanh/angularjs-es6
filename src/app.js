import "angular";
import "angular-route";
import "bootstrap";
import "./assets/sass/app.scss";
import CONFIG from "../webpack-config";
import INDEX_MODULE from "./index";
import ROUTES_MODULE from "./route";
import TEMPLATES_MODULE from "./templates";
import GLOBAL from "./shr/global";
import API from "./shr/api";

//merge semua module
let MODULES = ["ngRoute", GLOBAL, API, INDEX_MODULE];
MODULES = MODULES.concat(ROUTES_MODULE);
MODULES = MODULES.concat(TEMPLATES_MODULE);

console.log("LIST MODULE : ", MODULES);

angular.module(CONFIG.MODULE_NAME, MODULES);
