angular.module('ossdbWeb').controller('PackageDetailCtrl',function($scope, $state, $stateParams, $ossdb, $openhub, $log){
    $log.debug($stateParams);
    var create = $stateParams.id ? false: true;
    var fromPage = $stateParams.fromPage || 1;
    var modelPackage = $ossdb.model('package');
    var modelOssp = $ossdb.model('ossp');
    var modelLicense = $ossdb.model('license');

    $scope.name = '';
    $scope.ossp = {};
    $scope.license = {};
    $scope.package = null;
    $scope.canSave = false;
    $scope.canDelete = !create;
    $scope.osspList = null;
    $scope.licenseList = null;
    $scope.fromPage = fromPage;
    $scope.checkChanged = function() {
        if (create) {
            $scope.canSave = $scope.name ? true: false;
        } else {
            if ($scope.name !== $scope.ossp.name ||
                $scope.ossp.id !== $scope.package.ossp.id ||
                $scope.license.id !== $scope.package.license.id ) {
                $scope.canSave = true;
            }
        }
    };
    $scope.upsert = function() {
        var pkg = $scope.package || {};
        pkg.name = $scope.name;

//        var i, len = $scope.osspList.length, item;
//        for (i=0; i<len; i++) {
//            item = $scope.osspList[i];
//            if ($scope.selectedOssp == item.name) {
//                pkg.ossp = item.id;
//                break;
//            }
//        }
//        len = $scope.licenseList.length;
//        for (i=0; i<len; i++) {
//            item = $scope.licenseList[i];
//            if ($scope.selectedLicense == item.name) {
//                pkg.license = item.id;
//                break;
//            }
//        }
        if ($scope.selectedOssp) {
            pkg.ossp = $scope.selectedOssp.id;
        }
        if ($scope.selectedLicense) {
            pkg.license = $scope.selectedLicense.id;
        }

        modelPackage.setItem(pkg, function(resp) {
            $state.go('package', {
                page: fromPage
            });
        });
    };
    $scope.delete = function() {
        modelPackage.remove($stateParams.id, function(resp) {
            $state.go('package', {
                page: fromPage
            });
        });
    };
    $scope.findInOpenHubWeb = function() {
        var encoded = encodeURIComponent($scope.package.name);
        window.open("https://www.openhub.net/p?query=" + encoded + "&sort=relevance", '_blank');
        window.open("https://www.google.com/search?q=" + encoded, '_blank').focus();
    };
    $scope.findInOpenHub = function() {
        $openhub.query($scope.projectId, function(res) {
            console.log(res);
        });
    };

    function getById() {
        if (!create && $scope.osspList && $scope.licenseList) {
            modelPackage.getById($stateParams.id, function(pkg) {
                $scope.name = pkg.name;
                $scope.ossp = pkg.ossp || {};
                $scope.license = pkg.license || {};
                $scope.package = pkg;

                var i, len, item;
                len = $scope.osspList.length;
                $scope.osspList.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });
                for (i=0; i<len; i++) {
                    item = $scope.osspList[i];
                    if (item.id === $scope.ossp.id) {
                        $scope.selectedOssp = item;
                    }
                }
                len = $scope.licenseList.length;
                for (i=0; i<len; i++) {
                    item = $scope.licenseList[i];
                    if (item.id === $scope.license.id) {
                        $scope.selectedLicense = item;
                    }
                }
            });
        }
    }

    modelOssp.getAll(function(osspList) {
        $scope.osspList = osspList;
        getById();
    });
    modelLicense.getAll(function(licenseList) {
        $scope.licenseList = licenseList;
        getById();
    });
});