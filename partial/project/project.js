angular.module('ossdbWeb').controller('ProjectCtrl', function($scope, $state, $stateParams, $ossdb){

    var model = $ossdb.model('project');
    var pageNo = parseInt($stateParams.page, 10) || 1;

    function update() {
        model.getPage($scope.currentPage, $scope.itemsPerPage, 'projectId', null, function(resp) {
            $scope.projectList = resp.items;
            $scope.totalItems = resp.count;
        });
    }

    $scope.itemsPerPage = 5;
    $scope.currentPage = 1;
    $scope.pageChanged = function() {
        $state.go('project', {
            page :$scope.currentPage
        });
    };
    $scope.goDetail = function(id) {
        $state.go('project-detail', {
            id: id
        });
    };

    model.getCount(function(resp) {
        $scope.totalItems = resp.count;
        $scope.currentPage = pageNo;
        update();
    });

});