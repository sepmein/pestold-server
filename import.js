'use strict';

var data = require('./pco-export');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pestold');
var connection = mongoose.connection;

var Organization = require('./models/organization');

var formatted = [];

for (var i = data.length - 1; i--; i > 0) {
    var d = data[i];
    //console.log(d.cn.artificialPerson);
    //console.log(d.validityDate);
    var no, from, to, juristicPersonCn, presentationDate;

    if (typeof d._id === 'number') {
        no = d._id;
    } else {
        no = Number.parseInt(d._id);
    }

    var split;
    if (d.validityDate.indexOf('--') === -1) {
        split = d.validityDate.split('-');
        //console.log(split);
        from = split[0].trim();
        to = split[1].trim();
    } else {
        split = d.validityDate.split('--');
        from = split[0].trim();
        to = split[1].trim();
    }
    from = new Date(Date.parse(from));
    to = new Date(Date.parse(to));

    if (d.cn.artificialPerson.indexOf(' ') === '-1') {
        var tempPerson = d.cn.artificialPerson.split(' ');
        juristicPersonCn = String.prototype.concat(tempPerson[0], tempPerson[1]);
    } else {
        juristicPersonCn = d.cn.artificialPerson;
    }

    presentationDate = new Date(Date.parse(d.en.presentationDate));

    formatted[i] =
    {
        type: 'pco',
        name: d.en.company,
        juristicPerson: d.en.artificialPerson,
        address: d.en.address,
        nameCn: d.cn.company,
        juristicPersonCn: juristicPersonCn,
        addressCn: d.cn.address,
        pcoInfo: {
            grade: d.grade,
            no: no,
            validationDate: {
                from: from,
                to: to
            },
            presentationDate: presentationDate
        }
    };
}

console.log(formatted.length);

function handler(err, data) {
    if (err) {
        throw err;
    } else {
        console.log(data);
    }
}
connection.on('error', function (error) {
    console.log(error);
});

connection.once('open', function () {
    for (var j = formatted.length - 1; j--; j > 0) {
        var saveJtoOrg = new Organization(formatted[j]);
        saveJtoOrg.save(handler);
    }
});

