import { BuildPage } from "../module-builder";

export default BuildPage(
  {
    url: "/",
    path: "pages/home",
    controller: "HomeController",
  },
  ["$scope","SkillService",function ($scope,SkillService) {
    $scope.state = {
      skill: [],
    };

    async function getAllData() {
      const data = await SkillService.getAllData();
      console.log(data);
      $scope.state.skill = data;
      $scope.$apply();
    }
    getAllData();
  }]
);
