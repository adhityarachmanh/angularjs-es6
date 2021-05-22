import "angular";
import "angular-route";
import "bootstrap";
// support css
// import "../assets/css/style.css"
// support scss/sass
import "../assets/scss/app.scss"
import 'sweetalert2/src/sweetalert2.scss'

import IndexController from "./index";
import ROUTES_MODULE from "./route";
import TEMPLATES_MODULE from "./templates";
import GLOBAL_MODULE from "../shr/global";
import API_MODULE from "../shr/api";
import config from "./config";

//merge semua module
let MODULES = ["ngRoute", GLOBAL_MODULE, API_MODULE];
MODULES = MODULES.concat(ROUTES_MODULE);
MODULES = MODULES.concat(TEMPLATES_MODULE);

export const app = angular.module("app", MODULES),
    CONST_NULL = null,
    CONST_TRUE = true,
    angularForEach = angular.forEach,
    angularIsArray = angular.isArray,
    angularIsNumber = angular.isNumber,
    angularIsDefined = angular.isDefined,
    angularIsUndefined = angular.isUndefined,
    angularElement = angular.element,
    angularIsString = angular.isString,
    angularIsFunction = angular.isFunction,
    angularCopy = angular.copy,
    angularEquals = angular.equals,
    appConstant = app.constant,
    appConfig = app.config,
    appFactory = app.factory,
    appController = app.controller,
    appDirective = app.directive,
    appRegister = CONST_NULL,
    CONST_FALSE = !CONST_TRUE;

appConstant("C", config)
appController(IndexController.name, IndexController.controller)
