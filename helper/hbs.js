const moment = require('moment');

module.exports = {
    truncate: function (str, length) {
        return str.length > length ? str.substring(0, length) + '....' : str;
    },

    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },

    formatDate: function (date, format) {
        return moment(date).format(format);
    },

    // handlebar function for DropDown
    select: function (selected, options) {
        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace(new RegExp('>' + selected + '<option>'),
            'selected="selected"$&');
    },

    // To verify whether the author is commentor or not
    admin: function (loggedId, authorId) {
        if (loggedId === authorId) {
            return ' Author';
        } else {
            return '';
        }
    },

    // for floating pencil icon to edit
    editIcon: function (loggedId, authorId, storyId, floating = true) {
        if (authorId === loggedId) {
            if (floating) {
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`;
            } else {
                return `<a href="/stories/edit/${storyId}" class="btn grey"><i class="fa fa-pencil fa-2x"></i> Edit</a>`;
            }
        }else{
            return '';
        }
    }
}