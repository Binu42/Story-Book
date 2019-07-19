const moment = require('moment');

module.exports = {
    truncate: function(str){
        return str.substring(0, 100) + '...';
    },

    stripTags: function(input){
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    formatDate: function(date, format){
        return moment(date).format(format);
    },

    // handlebar function for DropDown
    select: function(selected, options){
        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace(new RegExp('>' + selected + '<option>'),
        'selected="selected"$&');
    }
}