'use strict';

var data = require('./pco-export');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pestold');
var connection = mongoose.connection;

var Organization = require('./models/organization');

var formatted = [];

console.info('[Start] Ready to Import ' + data.length + ' Records Totally.');
console.info('Importing....');

for (var i = 0; i < data.length; i++) {
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

    if (~d.cn.artificialPerson.trim().indexOf(' ')) { // jshint ignore:line
        var tempPerson = d.cn.artificialPerson.trim().split(' ');
        //console.log(tempPerson);
        juristicPersonCn = String.prototype.concat(tempPerson[0], tempPerson[tempPerson.length - 1]);
    } else {
        juristicPersonCn = d.cn.artificialPerson;
    }
    //console.log(juristicPersonCn);

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

function handler(err) {
    if (err) {
        throw err;
    }
}
connection.on('error', function (error) {
    console.error(error);
});

var count = 0;

connection.once('open', function () {
    for (var j = 0; j < formatted.length; j++) {
        count++;
        var saveJtoOrg = new Organization(formatted[j]);
        saveJtoOrg.save(handler);
    }
    console.info('[End] Imported ' + count + ' Records into MongoDB.');
    console.info('Import finished, press Ctrl+C to quit');
});

