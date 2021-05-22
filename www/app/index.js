export default {
  name: "IndexController",
  controller: [
    "$scope",
    "$rootScope",
    "$route",
    "$window",
    "$location",
    "G",
    "A",
    ($scope, $rootScope, $route, $window, $location, Global, svcRestAPI) => {

      var _logBrowsingStatistic = function (url) {
        if (url) {

        }
      };
      $scope.$route = $route;
      $scope.$on('$routeChangeStart', function ($event, current, previous) {
        var r = $location.path();
        $scope._t = "";
        if (r) {
          _logBrowsingStatistic(r);
        }
      });
      $rootScope.goBack = function () {
        $window.history.back();
      };

      $scope._logout = function () {
        $scope.removeLocalStorage("XA")
        Global.value('userdata', null);
        Global.value('memberdata', null);
        $rootScope._memInf(null);
        $rootScope._isLogin = 0;
        $rootScope._UserInfo(null);
        $scope._GoTo('/');
      };
      $rootScope._memInf = function (memInfo) {
        if (memInfo) { //set user info
          _memInfo = memInfo;
          $scope._memInfo = memInfo;
        } else { // get user info
          return _memInfo;
        }
      };
      $rootScope._UserInfo = function (userInfo) {
        if (userInfo) { //set user info
          _userInfo = userInfo;
          $scope._u = userInfo;
        } else { // get user info
          return _userInfo;
        }
      };
      $rootScope.removeLocalStorage = async function (key) {
        try {
          await localStorage.removeItem(key);
        } catch (error) {}
      };
      $rootScope.setLocalStorage = async function (key, payload) {
        try {
          await localStorage.setItem(key, payload);
        } catch (error) {}
      };
      $rootScope.getLocalStorage = async function getLocalStorage(key) {
        try {
          var val = await localStorage.getItem(key);
          if (val) return val;
        } catch (error) {}
      };
      $rootScope.getLocalStorage("XA").then(xa => {

        if (xa) {
          //AUTOLOGIN API
        }
      });
    },
  ]
};