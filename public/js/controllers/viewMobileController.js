angular.module('app').controller('viewMobileController', function ($scope, $state, ApiService, $stateParams, $mdDialog,$window) {
    var paramsId = $stateParams.id;
    $scope.moreFeatures = false;
    console.log("paramsId" + paramsId)
    var url = "/mobiles/" + paramsId;
    ApiService.get(url).then(function (result) {
        if (result.data.viewmobile) {
            var allMobiles = result.data.viewmobile;
            // console.log(allMobiles)
            $scope.name = allMobiles.name;
            $scope.model = allMobiles.model;
            $scope.cost = allMobiles.cost;
            $scope.color = allMobiles.color;
            $scope.battery = allMobiles.battery;
            $scope.primaryCamera = allMobiles.primaryCamera;
            $scope.secondaryCamera = allMobiles.secondaryCamera;
            $scope.memory = allMobiles.storage;
        } else {
            $state.go('app.addMobile')
        }


    })
    $scope.showFeatures = function () {
        $scope.moreFeatures = true;
    }
    $scope.hideFeatures = function () {
        $scope.moreFeatures = false;
    }
    function DialogController($scope, $mdDialog) {
        console.log("paramsId" + paramsId)
        var url = "/mobiles/" + paramsId;
        ApiService.get(url).then(function (result) {
            var allMobiles = result.data.viewmobile;
            // console.log(allMobiles)
            $scope.mobile = {
                mobileName: allMobiles.name,
                mobileModel: allMobiles.model,
                mobileColor: allMobiles.color,
                mobileCost: allMobiles.cost,
                mobileBattery: allMobiles.battery,
                mobilePrimaryCamera: allMobiles.primaryCamera,
                mobileSecondaryCamera: allMobiles.secondaryCamera,
                mobileMemory: allMobiles.storage
            }
        })
        $scope.editMobile = function (mobile) {
            var mobileName = mobile.mobileName;
            var mobileModel = mobile.mobileModel;
            var mobileColor = mobile.mobileColor;
            var mobileCost = mobile.mobileCost;
            var mobileBattery = mobile.mobileBattery;
            var mobilePrimaryCamera = mobile.mobilePrimaryCamera;
            var mobileSecondaryCamera = mobile.mobileSecondaryCamera;
            var mobileMemory = mobile.mobileMemory;
            if ((mobileName) && (mobileModel) && (mobileColor) && (mobileCost) && (mobileBattery) && (mobilePrimaryCamera) && (mobileSecondaryCamera) && (mobileMemory)) {
                $scope.mobileStatus = ""
                var data = {};
                data.mobileName = mobileName;
                data.mobileModel = mobileModel;
                data.mobileColor = mobileColor;
                data.mobileCost = mobileCost;
                data.mobileBattery = mobileBattery;
                data.mobilePrimaryCamera = mobilePrimaryCamera;
                data.mobileSecondaryCamera = mobileSecondaryCamera;
                data.mobileMemory = mobileMemory;
                var url = "http://localhost:3000/editmobile/" + paramsId
                ApiService.post(url, data).then(function (res) {
                    console.log(result.data)
                    if (result.data.success) {
                        $scope.mobileStatus = "mobile added successfully."
                        $window.location.reload();
                    }
                    if (result.data.error) {
                        $scope.mobileStatus = "mobile already exists."
                    }
                })
            } else {
                $scope.mobileStatus = "Please fill all fields"
            }

        }
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }
    $scope.edit = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/editMobile.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    $scope.delete = function () {
        var x = confirm("Are you sure you want to delete?");
        if (x) {
            var url = "http://localhost:3000/deletemobile/" + paramsId
            ApiService.get(url).then(function (result) {
                console.log("deleted successfully")
            })
            return true;
        }
        else
            return false;

    }
})