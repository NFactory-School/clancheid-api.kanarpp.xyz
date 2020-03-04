const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');

const User = require("../models/user");
const Qrcode = require("../models/qrcode");
const Log = require("../models/log");

AdminBro.registerAdapter(AdminBroMongoose);

const mongoose = require("mongoose");

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',
    branding: {
        companyName: 'ClancheID',
        logo: "https://cdn.discordapp.com/attachments/679980120819105806/684396430483652621/logo_3_moyen_fushia.png",
        favicon: "https://cdn.discordapp.com/attachments/679980120819105806/684396430483652621/logo_3_moyen_fushia.png",
    },
    resources: [
        {
            resource: User,
            options: {
                isVisible: { list: false, filter: false, show: false, edit: false },

                properties: {
                    User: {
                    }
                },
                name: 'Utilisateur',
                listProperties: ['pseudo', 'role', 'email', 'name', 'firstname', 'phone', 'created_at'],
                showProperties: ['pseudo', 'role', 'email', 'name', 'firstname', 'phone', 'created_at'],
                editProperties: ['pseudo', 'role', 'email', 'name', 'firstname', 'phone', 'created_at'],
            },
        },

        {
            resource: Log,
            options: {
                listProperties: ['pseudo', 'method', 'created_at'],
                showProperties: ['pseudo', 'method', 'created_at'],
                editProperties: [],
            },
        },

        {
            resource: Qrcode,
            options: {
                listProperties: ['email', 'qrcode', 'begin', 'end', 'created_at'],
                showProperties: ['email', 'qrcode', 'begin', 'end', 'created_at'],
                editProperties: ['email', 'qrcode', 'begin', 'end', 'created_at'],
            },
        },

    ],
});


module.exports = AdminBroExpress.buildRouter(adminBro);