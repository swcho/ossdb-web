angular.module('ossdbWeb').controller('PackageDetailCtrl',function($scope, $state, $stateParams, $ossdb, $openhub, $log){
    $log.debug($stateParams);
    var create = $stateParams.id ? false: true;
    var fromPage = $stateParams.fromPage || 1;
    var modelPackage = $ossdb.model('package');
    var modelOssp = $ossdb.model('ossp');
    var modelLicense = $ossdb.model('license');

    $scope.name = '';
    $scope.md5 = '';
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
                $scope.license.id !== $scope.package.license.id ||
                $scope.md5 !== $scope.package.md5) {
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
        pkg.md5 = $scope.md5;

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
                console.log(pkg);

                if (pkg.file) {
                    $scope.file_url = $ossdb.baseUrl() +
                        '/package/download?id=' + pkg.id +
                        '&name=' + pkg.name +
                        '&file=' + pkg.file;
                }

                $scope.md5 = pkg.md5;

                if ($scope.package.projects) {
                    $scope.package.projects.sort(function(a, b) {
                        return a.projectId.localeCompare(b.projectId);
                    });
                }

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

                $('#file-1').fileinput({
                    showUpload: false,
                    previewFileType: 'image',
                    uploadUrl: $ossdb.baseUrl() + '/package/upload?id=' + $scope.package.id + '&name=' + $scope.package.name
                }).on('fileuploaded', function() {
                    $state.go($state.current, {}, {reload: true});
                }).on('fileuploaderror', function() {
                    $state.go($state.current, {}, {reload: true});
                });
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

    //$.fn.fileinput.defaults.showPreview = false;

});