import homeComponent from "./views/home/home.component";
import testComponent from "./views/test/test.component";
export default [
  [
    "/", {
      component: homeComponent,
      template: 1
    }
  ],
  [
    "/test", {
      component: testComponent,
      template: 1
    }
  ],
];