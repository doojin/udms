define(['helper/jquery', 'tinyMCE'], function($, tinyMCE) {

    var REMOVE_SECTION_BUTTON_TEXT = 'Remove this section';

    var newTextAreasCount = 0;

    function PublicationForm(selector) {
        this._form = $(selector);
        this._addHandlers();
    }

    PublicationForm.prototype._addHandlers = function() {
        var self = this;
        this._newSectionButton().on('click', function() {
            self._addSection();
        });
        this._sections().on('click', '.remove-section', function() {
            self._parentSection(this).remove();
        });
    };

    PublicationForm.prototype._addSection = function () {
        var newSection = this._buildSection();
        this._sections().append(newSection);
        this._initTinyMCE(this._sectionDescription(newSection));
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

    } ;

    PublicationForm.prototype._newSectionButton = function() {
        return this._form.find('.add-section');
    };

    PublicationForm.prototype._sections = function() {
       return this._form.find('.sections');
    };

    PublicationForm.prototype._sectionDescription = function(section) {
        return section.find('.description');
    };

    PublicationForm.prototype._parentSection = function(child) {
        return $(child).closest('.section');
    };

    return PublicationForm;

});