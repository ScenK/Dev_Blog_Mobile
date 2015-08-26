import serverConfig from '../configs/server';
import _ from 'lodash';

var UserService = {
    name: 'user',
    read: function (req, resource, params, config, callback) {
        var user = req.session.user;
        callback(null, user == null ? null : user.userProfile);
    },

    update: function (req, resource, params, body, config, callback) {
    },

    delete: function (req, resource, params, config, callback) {
        req.session.destroy(function (err) {
            callback(err);
        })
    }
}


module.exports = UserService;
