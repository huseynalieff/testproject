var unirest = require('unirest');

module.exports = {
    name: 'strawpoll',
    type: 'utility',
    usage: 'strawpoll question|opt1,opt2,opt3,etc',
    permission: 1,
    help: 'Creates a strawpoll poll.',
    main: function(bot, msg) {
        try {
            var title = msg.content.substr(0, msg.content.indexOf('|'));
            var args = msg.content.split('|')[1];
            var opts = args.split(',');

            unirest.post('https://strawpoll.me/api/v2/polls')
                .headers({ 'Content-Type': 'application/json;charset=UTF-8' })
                .send({
                    title: title,
                    options: opts,
                    multi: false,
                    dupcheck: 'normal',
                    captcha: false,
                })
                .end(response => {
                    console.log(response.body);
                    msg.channel.send(`Created poll with title ${response.body.title} at https://strawpoll.me/${response.body.id}`);
                });
        } catch (err) {
            msg.channel.send('Error:' + err + '\nCommand Usage: {prefix}strawpoll question|option1, option2, option3, etc.');
        }
    },
};
