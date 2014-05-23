var usercollection = require('../../lib/userCollection')();
var Q = require('q');
module.exports = {
    type: "Express",
    services: {
        'updateLocation': function(req, res){
            var data = {};
            var username = req.body.username;
            var address = req.body.address;
            var name = req.body.name.name;
            var lat = req.body.lat;
            var lng = req.body.lng;

            data.id = Math.floor(Math.random()*1000);
            data.lat = lat;
            data.lng = lng;
            data.address = address;
            data.name = name;
            updateView.updateLocation(username, data)
                .then(function(){
                    return usercollection.getByUserName(username)
                })
                .then(function(user){
                    res.send(user.data);
                })
        },

        'deleteLocation': function(req, res){
            var userlocations = [];
            var username = req.body.username;
            var locationclicked = req.body.locationclicked.address;

            usercollection.getByUserName(username)
                .then(function(user){
                    var locationdata = user.data.locationdata;
                    if(locationdata && locationdata.length >= 1){
                        for(var i=0; i < locationdata.length; i++){
                            var locationname = locationdata[i].address;
                            if(locationname.indexOf(locationclicked) !== -1){
                                console.log('delete location ' + locationclicked + ' from db');
                            }
                            else{
                                userlocations.push(locationdata[i]);
                            }
                        }
                    }
                    return userlocations;
                })
                .then(function(userlocations){
                    var data={ data:{}};
                    data.data.status = 'success';
                    data.data.userlocations = userlocations;
                    updateView.saveLocations(username, userlocations)
                        .then(function(){
                            return usercollection.getByUserName(username)
                        })
                        .then(function(user){
                            res.send(user.data);
                        })
                })

        }
    }
};

var updateView = {
    updateLocation: function(username, data){
        return usercollection.updateLocation(username, data)
            .fail(function(error){
                console.log('Error saving name to db : ' + error);
            });
    },
    saveLocations: function(username, data){
        return usercollection.saveLocations(username, data)
            .fail(function(error){
                console.log('Error saving name to db : ' + error);
            });
    }
};