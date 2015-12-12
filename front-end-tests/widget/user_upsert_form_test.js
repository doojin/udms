define([
    'widget/user_upsert_form',
    'helper/jquery',
    'helper/slidable',
    'service/role_service'
], function(
    Form,
    $,
    slidable,
    roleService
) {

    describe('widget/user_upsert_form', function() {

        it('_clearForm should clear all form inputs', function() {
            var userIDInput = $('<input>')
                .addClass('user-id')
                .val('dummy value');
            var userNewGroupInput = $('<input>')
                .addClass('user-new-group')
                .val('dummy value');
            var userRoleSelect = $('<select>')
                .addClass('user-role')
                .append($('<option>').val('1'))
                .append($('<option>').val('dummy value').attr('selected', 'selected'));
            var userGroupSelect = $('<select>')
                .addClass('user-group')
                .append($('<option>').val('new'))
                .append($('<option>').val('dummy value').attr('selected', 'selected'));
            var form = $('<div>').append(userIDInput)
                .append(userNewGroupInput)
                .append(userRoleSelect)
                .append(userGroupSelect);
            var upsertForm = new Form(form);

            expect(userIDInput.val()).toEqual('dummy value');
            expect(userNewGroupInput.val()).toEqual('dummy value');
            expect(userGroupSelect.val()).toEqual('dummy value');
            expect(userRoleSelect.val()).toEqual('dummy value');

            upsertForm._clearForm();

            expect(userIDInput.val()).toEqual('');
            expect(userNewGroupInput.val()).toEqual('');
            expect(userGroupSelect.val()).toEqual('new');
            expect(userRoleSelect.val()).toEqual('1');
        });

        it('_prepareNewUserForm should make submit button visible', function() {
            var submitButton = $('<div>').addClass('submit').addClass('invisible');
            var form = $('<div>').append(submitButton);
            var upsertForm = new Form(form);

            expect(submitButton.hasClass('invisible')).toBeTruthy();

            upsertForm._prepareNewUserForm();

            expect(submitButton.hasClass('invisible')).toBeFalsy();
        });

        it('_prepareNewUserForm should make update button invisible', function() {
            var updateButton = $('<div>').addClass('update');
            var form = $('<div>').append(updateButton);
            var upsertForm = new Form(form);

            expect(updateButton.hasClass('invisible')).toBeFalsy();

            upsertForm._prepareNewUserForm();

            expect(updateButton.hasClass('invisible')).toBeTruthy();
        });

        it('constructor should bind element to show form event', function() {
            var form = $('<div>');
            var upsertForm = new Form(form);
            var btn = $('<button>');
            spyOn(slidable, 'bind');
            spyOn(upsertForm, '_prepareNewUserForm');

            expect(slidable.bind).not.toHaveBeenCalled();
            expect(upsertForm._prepareNewUserForm).not.toHaveBeenCalled();

            upsertForm.bindNewUserEvent(btn, 'click');
            btn.click();

            expect(slidable.bind).toHaveBeenCalledWith(btn, 'click', upsertForm._form);
            expect(upsertForm._prepareNewUserForm).toHaveBeenCalled();
        });

        it('_addGroupChangeListener should show/hide group name row depending on user group value', function() {
            var upsertForm = new Form();

            var userGroup = $('<select>').addClass('user-group')
                .append($('<option>').val('1'))
                .append($('<option>').val('2'));

            var groupNameInput = $('<input>').addClass('user-new-group');

            var groupNameRow = $('<div>')
                .addClass('row')
                .append(groupNameInput);

            upsertForm._form = $('<div>')
                .append(userGroup)
                .append(groupNameRow);

            upsertForm._addGroupChangeListener();

            expect(groupNameRow.hasClass('invisible')).toBeFalsy();

            userGroup.val('2').change();

            expect(groupNameRow.hasClass('invisible')).toBeTruthy();

            userGroup.val('1').change();

            expect(groupNameRow.hasClass('invisible')).toBeFalsy();
        });

        it('_populateRoles should populate user roles', function() {
            var upsertForm = new Form();
            var userRolesSelect = $('<select>').addClass('user-role');
            upsertForm._form = $('<div>').append(userRolesSelect);
            spyOn(roleService, 'roles').and.returnValue({
                '1': 'Dummy role 1',
                '2': 'Dummy role 2'
            });

            upsertForm._populateRoles();

            var options = userRolesSelect.find('option');
            expect(options.length).toEqual(2);
            expect(options[0].outerHTML).toEqual('<option value="1">Dummy role 1</option>');
            expect(options[1].outerHTML).toEqual('<option value="2">Dummy role 2</option>');
        });
    });

});