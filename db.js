var User = require('./src/repository/entity/user'),
    Role = require('./src/model/role'),
    securityService = require('./src/service/security_service'),
    mongoConfig = require('./src/config/mongo_config');

mongoConfig.setUp();

deleteUsers();

function deleteUsers() {
    User.remove({})
        .then(function() {
            console.log('All users were deleted');

            addBaseUsers();
            addDummyUsers();
        });
}

function addBaseUsers() {
    // Administrator
    securityService.encodePassword('a', function(password) {
        new User({
            userID: 'Administrator',
            userIDLowercase: 'usr-admin',
            password: password,
            role: Role.ADMINISTRATOR
        }).save(function() {
            console.log('User "usr-admin" created.');
        });
    });

    // Student
    securityService.encodePassword('s', function(password) {
        new User({
            userID: 'Student',
            userIDLowercase: 'usr-stud',
            password: password,
            role: Role.STUDENT
        }).save(function() {
            console.log('User "usr-stud" created.');
        });
    });

    // Professor
    securityService.encodePassword('p', function(password) {
        new User({
            userID: 'Professor',
            userIDLowercase: 'usr-prof',
            password: password,
            role: Role.PROFESSOR
        }).save(function() {
            console.log('User "usr-prof" created.');
        });
    });
}

function addDummyUsers() {
    for (var i = 0; i < 300; i++) {
        (function(j) {
            new User({
                userID: 'Dummy User ' + j,
                role: Role.STUDENT,
                group: '4103BD'
            })
                .save()
                .then(function() {
                    console.log('Dummy User ' + j + ' was created.')
                });
        }(i));
    }
}


