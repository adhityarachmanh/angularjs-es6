import "angular";
import ngRoute from "angular-route";
import "bootstrap";
// support css
import "../assets/css/style.css"
// support scss/sass
import "../assets/scss/app.scss"
import 'sweetalert2/src/sweetalert2.scss'

import IndexComponent from "./index";
import routes from "./routes";
import Global from "../shr/global";
import SvcRestAPI from "../shr/api";
import Config from "./config";
import {
    NgModule
} from "../shr/module-builder";
import {
    Template1Directive,
    Template2Directive,
    Template3Directive
} from "./templates/templates.component";
import homeComponent from "./views/home/home.component";
import testComponent from "./views/test/test.component";

NgModule("adm",{
    components: [
        homeComponent,
        testComponent
    ],
    services: [],
    constants: [],
    directives: [
        Template1Directive,
        Template2Directive,
        Template3Directive
    ],
    imports: [
        ngRoute,
        Config,
        Global,
        SvcRestAPI,
    ],
    routes: routes,
    index: IndexComponent
})