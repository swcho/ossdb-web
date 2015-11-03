angular.module('ossdbWeb').controller('OsspDetailCtrl',function($scope, $state, $stateParams, $ossdb){

    var create = $stateParams.id ? false: true;
    var model = $ossdb.model('ossp');
    var modelLicense = $ossdb.model('license');

    $scope.name = '';
    $scope.projectUrl = '';
    $scope.ossp = null;
    $scope.canSave = false;
    $scope.canDelete = !create;
    $scope.checkChanged = function() {
        if (create) {
            if ($scope.name) {
                $scope.canSave = true;
            }
        } else {
            if ($scope.name !== $scope.ossp.name ||
                    $scope.projectUrl !== $scope.ossp.projectUrl) {
                $scope.canSave = true;
            }
        }
    };
    $scope.upsert = function() {
        var ossp = $scope.ossp || {};
        ossp.name = $scope.name;
        ossp.projectUrl = $scope.projectUrl;

        model.setItem(ossp, function(resp) {
            $state.go('ossp');
        });
    };
    $scope.delete = function() {
        model.remove($stateParams.id, function(resp) {
            $state.go('ossp');
        });
    };
    // test: http://www.openhub.net/p/avahi
    $scope.importOpenHub = function() {
        if ($scope.urlOpenHub) {
            model.importOpenHub($scope.urlOpenHub, function(resp) {
                if (resp) {
                    $state.go('ossp-detail', {
                        id: resp.project.id
                    });
                }
            });
        }
    };

    $scope.addLicense = function() {
        if ($scope.licenseAdded) {
            console.log($scope.licenseAdded);
            if ($scope.ossp.licenses) {
                $scope.ossp.licenses.push($scope.licenseAdded.id);
            } else {
                $scope.ossp.licenses = [$scope.licenseAdded.id];
            }
            model.setItem($scope.ossp, function() {
                $state.go('ossp-detail', {
                    id: $scope.ossp.id
                }, {reload: true});
            });
        }
    };

    $scope.deleteLicense = function(licenseDeleted) {
        var index = -1;
        $scope.ossp.licenses.forEach(function(l, i) {
            if (l.id == licenseDeleted.id) {
                index = i;
            }
        });
        if (index != -1) {
            console.log($scope.ossp.licenses.splice(index, 1));
        }
        model.setItem($scope.ossp, function() {
            $state.go('ossp-detail', {
                id: $scope.ossp.id
            }, {reload: true});
        });
    };

    if (!create) {
        model.getById($stateParams.id, function(ossp) {
            $scope.name = ossp.name;
            $scope.projectUrl = ossp.projectUrl;
            $scope.ossp = ossp;
            console.log(ossp);
        });
    }

    modelLicense.getAll(function(licenseList) {
        $scope.licenseList = licenseList;
    });
});