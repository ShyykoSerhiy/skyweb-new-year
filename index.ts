import * as yargs from 'yargs';
import Skyweb from 'skyweb/dist/src/skyweb';

interface IArgv {
    username: string,
    password: string,
    message: string
}

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
            })
    }, async (argv) => {
        const { username, password, message } = (argv as any as IArgv);
        const skyweb = new Skyweb();
        await skyweb.login(username, password);        
        let currentIndex = 0;
        const contacts = skyweb.contactsService.contacts;
        const runNext = () => {
            const c = contacts[currentIndex];
            if (c) {
                setTimeout(() => {                    
                    skyweb.sendMessage((c as any).person_id, message);
                    console.log(`${currentIndex + 1} message from ${contacts.length} has been sent.`)
                    currentIndex++;
                    runNext()
                }, 500)
            } else {
                process.exit();
            }
        }       
        runNext();         
    })
    .argv