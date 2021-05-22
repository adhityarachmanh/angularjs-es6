import axios from "axios";
import Swal from 'sweetalert2'
export default {
  template:require('./post.html'),
  controller:[
    "$scope",
    "$rootScope",
    "$routeParams",
     ($scope, $rootScope, $routeParams)=> {
      $scope.data = {};
      $scope.testSweetAlert =function () { 
        Swal.fire("Error!","asfasf","error")
       }
      $scope.loadData = async function (id) {
        var response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/" + id
        );
        const { data } = response;
        $scope.data = data;
        $scope.$apply();
      };
      $scope.loadData($routeParams.id);
    },
  ]
};
