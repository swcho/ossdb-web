angular.module('ossdbWeb').controller('LicenseDetailCtrl',function($scope, $state, $stateParams, $ossdb){

    var create = $stateParams.id ? false: true;
    var model = $ossdb.model('license');

    $scope.name = '';
    $scope.distributeLicense = false;
    $scope.distributeSource = false;
    $scope.license = null;
    $scope.canSave = false;
    $scope.canDelete = !create;
    $scope.checkChanged = function() {
        if (create) {
            if ($scope.name) {
                $scope.canSave = true;
            }
        } else {
            if ($scope.name !== $scope.license.name ||
                    $scope.distributeLicense !== $scope.license.distributeLicense ||
                    $scope.distributeSource !== $scope.license.distributeSource) {
                $scope.canSave = true;
            }
        }
    };
    $scope.upsert = function() {
        var license = $scope.license || {};
        license.name = $scope.name;
        license.distributeLicense = $scope.distributeLicense;
        license.distributeSource = $scope.distributeSource;

        model.setItem(license, function() {
            $state.go('license');
        });
    };
    $scope.remove = function() {
        model.remove($stateParams.id, function() {
            $state.go('license');
        });
    };
    // test http://www.openhub.net/licenses/lgpl
    $scope.importOpenHub = function() {
        model.importOpenHub($scope.urlOpenHub, function(resp) {
            console.log(resp);
            $state.go('license-detail', {
                id: resp.license.id
            });
        });
    };

    if (!create) {
        model.getById($stateParams.id, function(license) {
            $scope.name = license.name;
            $scope.distributeLicense = license.distributeLicense;
            $scope.distributeSource = license.distributeSource;
            $scope.license = license;
        });
    }

});