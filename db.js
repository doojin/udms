var User = require('./src/repository/entity/user'),
    Role = require('./src/model/role'),
    Group = require('./src/repository/entity/group'),
    securityService = require('./src/service/security_service'),
    mongoConfig = require('./src/config/mongo_config'),
    userRepository = require('./src/repository/user_repository');

mongoConfig.setUp();

deleteUsers();

function deleteUsers() {
    User.remove({})
        .then(function() {
            //addDummyUsers();
            addBaseUsers();
        });
}

function addBaseUsers() {
    securityService.encodePassword('x', function(password) {
        var user = new User({
            userID: 'Mister X',
            userIDLowercase: 'xxxxx',
            password: password,
            role: Role.ADMINISTRATOR
        });

        userRepository.save(user, function() {
            console.log('Mister X was created');
        });
    });

    // Administrator
    securityService.encodePassword('a', function(password) {
        var user = new User({
            userID: 'Administrator',
            userIDLowercase: 'usr-admin',
            password: password,
            role: Role.ADMINISTRATOR
        });
        userRepository.save(user, function() {
            console.log('User "usr-admin" created.');
        });
    });

    // Student
    securityService.encodePassword('s', function(password) {
        var user = new User({
            userID: 'Student',
            userIDLowercase: 'usr-stud',
            password: password,
            role: Role.STUDENT,
            group: new Group({
                name: '4103BD',
                nameLowercase: '4103bd'
            })
        });
        userRepository.save(user, function() {
            console.log('User "usr-stud" created.');
        });
    });

    // Professor
    securityService.encodePassword('p', function(password) {
        var user = new User({
            userID: 'Professor',
            userIDLowercase: 'usr-prof',
            password: password,
            role: Role.PROFESSOR
        });
        userRepository.save(user, function() {
            console.log('User "usr-prof" created.');
        });
    });
}

function addDummyUsers() {
    for (var i = 0; i < 300; i++) {
        (function(j) {
            var user = new User({
                userID: 'Dummy User ' + j,
                role: Role.STUDENT
            });

            userRepository.save(user, function() {
                console.log('Dummy User ' + j + ' was created.');
            });
        }(i));
    }
}


