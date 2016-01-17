define([
    'helper/jquery',
    'tinyMCE',
    'widget/list',
    'service/group_service',
    'service/user_service',
    'service/publication_service'
], function(
    $,
    tinyMCE,
    List,
    groupService,
    userService,
    publicationService
) {

    var REMOVE_SECTION_BUTTON_TEXT = 'Remove this section';

    var newTextAreasCount = 0;

    function PublicationForm(selector) {
        var self = this;

        this.onSubmit = function() {
            self._removeErrors();
            var data = self.data();
            publicationService.validate(data, function(result) {
                if (!result.success) self._addErrors(result);
                else window.location = '/publications';
            });
        };

        this.onDataLoad = function() {};

        this._form = $(selector);
        this._addHandlers();

        this._initMemberWidgets();
    }

    PublicationForm.prototype.data = function() {
        try {
            tinyMCE.triggerSave();
        } catch (e) {}

        var data = {
            name: this._publicationName().val(),
            description: this._publicationDescription().val(),
            members: this._memberList.data()
        };

        var self = this;
        var sections = [];
        this._sections().find('.section').each(function() {
            sections.push({
                title: self._sectionTitle(this).val(),
                description: self._sectionDescription(this).val()
            });
        });
        data.sections = sections;

        return data;
    };

    PublicationForm.prototype._addHandlers = function() {
        var self = this;
        this._newSectionButton().on('click', function() {
            self._addSection();
        });
        this._sections().on('click', '.remove-section', function() {
            self._parentSection(this).remove();
        });
        this._submitButton().on('click', function() {
            var data = self.data();
            self.onSubmit(data);
        });
    };

    PublicationForm.prototype._addSection = function () {
        var newSection = this._buildSection();
        this._sections().append(newSection);
        var textarea = this._sectionDescription(newSection);
        this._initTinyMCE(textarea);
    };

    PublicationForm.prototype._initTinyMCE = function(textarea) {
        var uniqueID = 'new-textarea-' + ++newTextAreasCount;
        textarea.attr('id', uniqueID);
        tinyMCE.execCommand('mceAddEditor', true, uniqueID);
        textarea.removeAttr('id');
    };

    PublicationForm.prototype._buildSection = function() {
        // Remove button
        var removeButton = $('<div>')
            .addClass('tiny')
            .addClass('radius')
            .addClass('remove-section')
            .addClass('button')
            .html(REMOVE_SECTION_BUTTON_TEXT);
        var removeButtonColumns = $('<div>')
            .addClass('small-12')
            .addClass('large-10')
            .addClass('end')
            .addClass('text-right')
            .addClass('columns')
            .append(removeButton);
        var removeButtonRow = $('<div>')
            .addClass('row')
            .append(removeButtonColumns);

        // Section title
        var sectionTitleLabel = $('<label>').html('Section Title:');
        var sectionTitleLabelColumns = $('<div>')
            .addClass('small-12')
            .addClass('large-3')
            .addClass('columns')
            .append(sectionTitleLabel);
        var sectionTitleInput = $('<input>')
            .attr('type', 'text')
            .addClass('title');
        var sectionTitleInputColumns = $('<div>')
            .addClass('small-12')
            .addClass('large-7')
            .addClass('end')
            .addClass('columns')
            .append(sectionTitleInput);
        var sectionTitleRow = $('<div>')
            .addClass('row')
            .append(sectionTitleLabelColumns)
            .append(sectionTitleInputColumns);

        // Section description
        var sectionDescriptionLabel = $('<label>').html('Section Description:');
        var sectionDescriptionLabelColumns = $('<div>')
            .addClass('small-12')
            .addClass('large-3')
            .addClass('columns')
            .append(sectionDescriptionLabel);
        var sectionDescriptionTextarea = $('<textarea>').addClass('description');
        var sectionDescriptionTextareaColumns = $('<div>')
            .addClass('small-12')
            .addClass('large-7')
            .addClass('end')
            .addClass('columns')
            .append(sectionDescriptionTextarea);
        var sectionDescriptionRow = $('<div>')
            .addClass('row')
            .append(sectionDescriptionLabelColumns)
            .append(sectionDescriptionTextareaColumns);

        return $('<section>')
            .addClass('section')
            .append(removeButtonRow)
            .append(sectionTitleRow)
            .append(sectionDescriptionRow);
    };

    PublicationForm.prototype._initMemberWidgets = function() {
        var studentList = new List();
        studentList.title('Students');

        var groupList = new List();
        groupList.title('Groups');

        var self = this;

        // Loading groups
        groupService.groups(function(groups) {
            groups.forEach(function(group) {
                var item = new List.Item(group.name, group);
                groupList.add(item);
            });

            // Loading students
            userService.students(function(users) {
                users.forEach(function(user) {
                    var item = new List.Item(user.userID, user);
                    studentList.add(item);
                });

                self.onDataLoad();
            });
        });

        var memberList = new List();
        memberList.title('Result');

        studentList.appendTo(this._studentsDiv());
        groupList.appendTo(this._groupsDiv());
        memberList.appendTo(this._membersDiv());

        studentList.onClick = function(item) {
            item.type = 'student';
            studentList.remove(item);
            memberList.add(item);
        };

        groupList.onClick = function(item) {
            item.type = 'group';
            groupList.remove(item);
            memberList.add(item);
        };

        memberList.onClick = function(item) {
            memberList.remove(item);
            if (item.type === 'student') return studentList.add(item);
            groupList.add(item);
        };

        this._memberList = memberList;
    };

    PublicationForm.prototype._addError = function(field, error) {
        var fieldColumns = $(field).closest('.columns');
        fieldColumns.find('.error').remove();
        var htmlError = $('<small>').addClass('error').html(error);
        fieldColumns.append(htmlError);
    };

    PublicationForm.prototype._addErrors = function(validationResult) {
        validationResult.name && this._addError(this._publicationName(), validationResult.name);
        validationResult.description && this._addError(this._publicationDescription(), validationResult.description);
        var self = this;
        validationResult.sections && validationResult.sections.forEach(function(section, index) {
            section.title && self._addError(self._sectionTitle(self._nthSection(index)), section.title);
            section.description && self._addError(self._sectionDescription(self._nthSection(index)), section.description);
        });
        validationResult.members && self._addError(self._membersWidget(), validationResult.members);
    };

    PublicationForm.prototype._removeErrors = function() {
        this._form.find('small.error').remove();
    };

    PublicationForm.prototype._nthSection = function(n) {
        return this._sections().find('.section').eq(n);
    };

    PublicationForm.prototype._newSectionButton = function() {
        return this._form.find('.add-section');
    };

    PublicationForm.prototype._sections = function() {
       return this._form.find('.sections');
    };

    PublicationForm.prototype._sectionDescription = function(section) {
        return $(section).find('.description');
    };

    PublicationForm.prototype._sectionTitle = function(section) {
        return $(section).find('.title');
    };

    PublicationForm.prototype._parentSection = function(child) {
        return $(child).closest('.section');
    };

    PublicationForm.prototype._publicationName = function() {
        return this._form.find('.publication-name');
    };

    PublicationForm.prototype._publicationDescription = function() {
        return this._form.find('.publication-description');
    };

    PublicationForm.prototype._studentsDiv = function() {
        return this._form.find('.students.columns');
    };

    PublicationForm.prototype._groupsDiv = function() {
        return this._form.find('.groups.columns');
    };

    PublicationForm.prototype._membersDiv = function() {
        return this._form.find('.members.columns');
    };

    PublicationForm.prototype._submitButton = function() {
        return this._form.find('.submit');
    };

    PublicationForm.prototype._membersWidget = function() {
        return this._membersDiv().find('ul');
    };

    return PublicationForm;

});