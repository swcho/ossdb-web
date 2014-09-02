angular.module('ossdbWeb').controller('LicenseCtrl',function($scope, $state, $ossdb){

    var model = $ossdb.model('license');

    function update() {
        model.getPage($scope.currentPage, $scope.itemsPerPage, 'name', function(resp) {
            $scope.licenseList = resp.items;
            $scope.totalItems = resp.count;
        });
    }

    $scope.itemsPerPage = 5;
    $scope.currentPage = 1;
    $scope.pageChanged = function() {
        update();
    };
    $scope.goDetail = function(id) {
        $state.go('license-detail', {
            id: id
        });
    };

    update();

});