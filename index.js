"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const skyweb_1 = require("skyweb/dist/src/skyweb");
yargs
    .command('send [username] [password] [message]', 'send new year greating to everyone in your contact list', (yargs) => {
    return yargs
        .option('u', {
        alias: 'username',
        demandOption: true,
        describe: 'username for skype (can be microsoft account but without two factor auth)',
        type: 'string'
    })
        .option('p', {
        alias: 'password',
        demandOption: true,
        describe: 'password for skype',
        type: 'string'
    })
        .option('m', {
        alias: 'message',
        demandOption: true,
        default: '<ss type=\"xmastree\">(xmastree)</ss> Happy New Year! <ss type=\"xmastree\">(xmastree)</ss>',
        describe: 'message to send',
        type: 'string'
    });
}, (argv) => __awaiter(this, void 0, void 0, function* () {
    const { username, password, message } = argv;
    const skyweb = new skyweb_1.default();
    yield skyweb.login(username, password);
    let currentIndex = 0;
    const contacts = skyweb.contactsService.contacts;
    const runNext = () => {
        const c = contacts[currentIndex];
        if (c) {
            setTimeout(() => {
                skyweb.sendMessage(c.person_id, message);
                console.log(`${currentIndex + 1} message from ${contacts.length} has been sent.`);
                currentIndex++;
                runNext();
            }, 500);
        }
        else {
            process.exit();
        }
    };
    runNext();
}))
    .argv;
