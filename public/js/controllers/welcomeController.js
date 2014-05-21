'use strict';
favorloca.module('favorloca.controllers', [])
    .controller('Welcome', function($rootScope, $scope, $log, $location, httpService, userDataCache, $cookieStore){
        var userData = {
            get:function(){
                if(userDataCache.get('userdata') !== null)
                    return userDataCache.get('userdata');
            }
        };

        $scope.user = userData.get();

        var username = $scope.user.username;
        var geocoder;
        var map;
        var address = "San Francisco, CA";

        $scope.favoritelocation = {id:1, username: username, lat: '', lng: '', address: '', name: ''};
        $scope.locationtypes = [{ name:'home'}, {name:'work'}, {name:'fun'}];
        toggleMapLoaded(false);

        $scope.closeModal = function(){
            $scope.modalOpen = false;
        };
        $scope.addNewLocation = function(){
            $log.info('add new fave location');

            address = $scope.favoritelocation.address;
            callGeoCoder(address);
        };

        $scope.viewLocation = function(){
            $log.info('viewLocation location');

            address = $scope.user.locationdata[this.$index].address;
            callGeoCoder(address);
        };

        $scope.postLocation = function(){
            // todo 2014-05-21: add comments/notes field to save a users comments for each location
            httpService.post('/addfavoritelocation', $scope.favoritelocation)
                .success(function(user, headers, status){
                    if(user.status === 'error'){
                        $log.debug('add location service error');
                    }
                    else{
                        userDataCache.put('userdata', user);
                        $scope.user = userData.get();
                        $scope.modalOpen = true;
                        $scope.favoritelocation.address = '';
                        $scope.favoritelocation.name = '';
                        toggleMapLoaded(false);
                    }
                })
                .error(function(error){
                    $log.debug('add location service error');
                });

        };

        $scope.deleteLocation = function(){

            $scope.user.locationclicked = $scope.user.locationdata[this.$index];
            httpService.post('/deletelocation', $scope.user)
                .success(function(user, headers, status){
                    if(user.status === 'error'){
                        $log.debug('delete location service error');
                    }
                    else{
                        userDataCache.put('userdata', user);
                        $scope.user = userData.get();
                    }
                })
                .error(function(error){
                    $log.debug('add location service error');
                });
        };

        $scope.$on("menuClick", function () {
            $scope.user = userData.get();
            $scope.modalOpen = true;
        });

        function initialize() {
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(37.7577,-122.4376);
            var myOptions = {
                zoom: 8,
                center: latlng,
                mapTypeControl: true,
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
                navigationControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        }
        initialize();

        function toggleMapLoaded(boolean) {
            $scope.mapLoaded = boolean;
        }

        function callGeoCoder(address){
            if (geocoder) {
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                            toggleMapLoaded(true);
                            map.setCenter(results[0].geometry.location);

                            var infowindow = new google.maps.InfoWindow(
                                {
                                    content: '<b>'+address+'</b>',
                                    size: new google.maps.Size(150,50)
                                });

                            $scope.favoritelocation.lat = results[0].geometry.location.k;
                            $scope.favoritelocation.long = results[0].geometry.location.A;
                            var marker = new google.maps.Marker({
                                position: results[0].geometry.location,
                                map: map,
                                title:address
                            });
                            google.maps.event.addListener(marker, 'click', function() {
                                infowindow.open(map,marker);
                            });


                        } else {
                            alert('No results found');
                        }
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        }
    });
