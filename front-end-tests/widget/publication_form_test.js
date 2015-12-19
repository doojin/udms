define([
    'helper/jquery',
    'widget/publication_form',
    'widget/list',
    'service/group_service',
    'service/user_service'
], function(
    $,
    PublicationForm,
    List,
    groupService,
    userService
) {

    describe('widget/publication_form', function() {

        beforeEach(function() {
            spyOn(groupService, 'groups');
            spyOn(userService, 'students');
        });

        it('_addSection should add new section to the form', function() {
            var form = new PublicationForm();
            var textarea = $('<textarea>');
            spyOn(form, '_sectionDescription').and.returnValue(textarea);
            var section = $('<section>');
            spyOn(form, '_buildSection').and.returnValue(section);
            var sections = $('<section>');
            spyOn(form, '_sections').and.returnValue(sections);
            spyOn(form, '_initTinyMCE');

            expect(sections.find('section').length).toEqual(0);

            form._addSection();

            expect(sections.find('section').length).toEqual(1);
            expect(form._initTinyMCE).toHaveBeenCalledWith(textarea);
        });

        it('_buildSection should build new section', function() {
            var form = new PublicationForm();
            var section = form._buildSection();

            expect(section[0].outerHTML).toEqual('<section class="section">' +
                '<div class="row">' +
                '<div class="small-12 large-10 end text-right columns">' +
                '<div class="tiny radius remove-section button">Remove this section</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="small-12 large-3 columns">' +
                '<label>Section Title:</label>' +
                '</div>' +
                '<div class="small-12 large-7 end columns">' +
                '<input type="text" class="title">' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="small-12 large-3 columns">' +
                '<label>Section Description:</label>' +
                '</div>' +
                '<div class="small-12 large-7 end columns">' +
                '<textarea class="description"></textarea>' +
                '</div>' +
                '</div>' +
                '</section>');
        });

        it('_initMemberWidgets should append three list widgets to the form', function() {
            var form = new PublicationForm();

            var studentDiv = $('<div>');
            var groupDiv = $('<div>');
            var memberDiv = $('<div>');

            spyOn(form, '_studentsDiv').and.returnValue(studentDiv);
            spyOn(form, '_groupsDiv').and.returnValue(groupDiv);
            spyOn(form, '_membersDiv').and.returnValue(memberDiv);

            form._initMemberWidgets();

            expect(studentDiv.find('ul').length).toEqual(1);
            expect(groupDiv.find('ul').length).toEqual(1);
            expect(memberDiv.find('ul').length).toEqual(1);
        });

        it('_initMemberWidgets should add click handlers for list widgets', function() {
            groupService.groups.and.callFake(function(callback) {
                callback([
                    { name: 'Group 1' },
                    { name: 'Group 2' }
                ]);
            });

            userService.students.and.callFake(function(callback) {
                callback([
                    { userID: 'User 1' },
                    { userID: 'User 2' }
                ]);
            });

            var form = new PublicationForm();

            var studentDiv = $('<div>');
            var groupDiv = $('<div>');
            var memberDiv = $('<div>');

            spyOn(form, '_studentsDiv').and.returnValue(studentDiv);
            spyOn(form, '_groupsDiv').and.returnValue(groupDiv);
            spyOn(form, '_membersDiv').and.returnValue(memberDiv);

            function getFirst(e) { return e.find('ul').find('li').first() }
            function getLast(e) { return e.find('ul').find('li').last() }

            form._initMemberWidgets();

            expect(getFirst(studentDiv).html()).toEqual('User 1');

            getFirst(studentDiv).click();

            expect(getFirst(studentDiv).html()).toEqual('User 2');
            expect(getLast(memberDiv).html()).toEqual('User 1');

            getLast(memberDiv).click();

            expect(getLast(memberDiv).html()).toEqual(undefined);
            expect(getLast(studentDiv).html()).toEqual('User 1');

            expect(getFirst(groupDiv).html()).toEqual('Group 1');

            getFirst(groupDiv).click();

            expect(getFirst(groupDiv).html()).toEqual('Group 2');
            expect(getLast(memberDiv).html()).toEqual('Group 1');

            getLast(memberDiv).click();

            expect(getLast(memberDiv).html()).toEqual(undefined);
            expect(getLast(groupDiv).html()).toEqual('Group 1');
        });

        it('data should collect form data', function() {
            var form = new PublicationForm();

            var publicationName = $('<input>').val('dummy publication name'),
                publicationDescription = $('<input>').val('dummy publication description'),
                publicationMembers = new List();

            spyOn(form, '_publicationName').and.returnValue(publicationName);
            spyOn(form, '_publicationDescription').and.returnValue(publicationDescription);
            spyOn(publicationMembers, 'data').and.returnValue('dummy publication members');
            form._memberList = publicationMembers;

            var title1 = $('<input>')
                .addClass('title')
                .val('dummy title 1');
            var description1 = $('<textarea>')
                .addClass('description')
                .val('dummy description 1');
            var section1 = $('<section>')
                .addClass('section')
                .append(title1)
                .append(description1);

            var title2 = $('<input>')
                .addClass('title')
                .val('dummy title 2');
            var description2 = $('<textarea>')
                .addClass('description')
                .val('dummy description 2');
            var section2 = $('<section>')
                .addClass('section')
                .append(title2)
                .append(description2);

            var sections = $('<section>')
                .addClass('sections')
                .append(section1)
                .append(section2);

            spyOn(form, '_sections').and.returnValue(sections);

            var formData = form.data();

            expect(formData).toEqual({
                name: 'dummy publication name',
                description: 'dummy publication description',
                members: 'dummy publication members',
                sections: [
                    { title: 'dummy title 1', description: 'dummy description 1' },
                    { title: 'dummy title 2', description: 'dummy description 2' }
                ]
            });
        });

        it('_addError should append error to corresponding element', function() {
            var element = $('<input>');
            var columns = $('<div>')
                .addClass('columns')
                .append(element);

            var form = new PublicationForm();
            form._root = columns;

            expect(columns.find('.error').length).toEqual(0);

            form._addError(element, 'dummy error');

            expect(columns.find('.error').length).toEqual(1);
            expect(columns.find('.error').html()).toEqual('dummy error');
        });

        it('_addError should remove previous errors', function() {
            var element = $('<input>');

            var error1 = $('<small>').addClass('error').html('dummy error 1');
            var error2 = $('<small>').addClass('error').html('dummy error 2');
            var error3 = $('<small>').addClass('error').html('dummy error 3');

            var columns = $('<div>')
                .addClass('columns')
                .append(element)
                .append(error1)
                .append(error2)
                .append(error3);

            var form = new PublicationForm();
            form._root = columns;

            expect(columns.find('.error').length).toEqual(3);
            expect(columns.has(error1).length).toEqual(1);
            expect(columns.has(error2).length).toEqual(1);
            expect(columns.has(error3).length).toEqual(1);

            form._addError(element, 'dummy error');

            expect(columns.find('.error').length).toEqual(1);
            expect(columns.has(error1).length).toEqual(0);
            expect(columns.has(error2).length).toEqual(0);
            expect(columns.has(error3).length).toEqual(0);
        });

        it('_nthSection should return nth section of form', function() {
            var section1 = $('<section>').addClass('section').html('1'),
                section2 = $('<section>').addClass('section').html('2'),
                section3 = $('<section>').addClass('section').html('3');

            var sections = $('<section>')
                .append(section1)
                .append(section2)
                .append(section3);

            var form = new PublicationForm();
            spyOn(form, '_sections').and.returnValue(sections);

            expect(form._nthSection(0)[0]).toEqual(section1[0]);
            expect(form._nthSection(1)[0]).toEqual(section2[0]);
            expect(form._nthSection(2)[0]).toEqual(section3[0]);
            expect(form._nthSection(3)[0]).toBeUndefined();
        });
    });

});