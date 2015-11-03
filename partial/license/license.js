angular.module('ossdbWeb').controller('LicenseCtrl',function($scope, $state, $stateParams, $ossdb){

    var model = $ossdb.model('license');
    var pageNo = parseInt($stateParams.page, 10) || 1;

    function update() {
        model.getPage($scope.currentPage, $scope.itemsPerPage, 'name', null, function(resp) {
            $scope.licenseList = resp.items;
            $scope.totalItems = resp.count;
        });
    }

    $scope.itemsPerPage = 5;
    $scope.currentPage = 1;
    $scope.pageChanged = function() {
        $state.go('license', {
            page :$scope.currentPage
        });
    };
    $scope.goDetail = function(id) {
        $state.go('license-detail', {
            id: id
        });
    };

    model.getCount(function(resp) {
        $scope.totalItems = resp.count;
        $scope.currentPage = pageNo;
        update();
    });

});