angular.module('ossdbWeb').controller('OsspDetailCtrl',function($scope, $state, $stateParams, $ossdb){

    var create = $stateParams.id ? false: true;

    $scope.name = '';
    $scope.projectUrl = '';
    $scope.ossp = null;
    $scope.canSave = false;
    $scope.checkChanged = function() {
        if (create) {
            if ($scope.name) {
                $scope.canSave = true;
            }
        }
    }
    $scope.upsert = function() {
        var ossp = $scope.ossp || {};
        ossp.name = $scope.name;
        ossp.projectUrl = $scope.projectUrl;

        $ossdb.setOssp(ossp, function(resp) {
            $state.go('ossp');
        });
    }

    if (create) {
        $ossdb.getOssp($stateParams.id, function(ossp) {
            $scope.name = ossp.name;
            $scope.projectUrl = ossp.projectUrl;
            $scope.ossp = ossp;
        });
    }

});