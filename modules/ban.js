// Work on permission checks here too
module.exports = {
    name: 'ban',
    type: 'moderation',
    usage: 'ban <user> <reason>',
    permission: 4,
    help: 'Bans a user and puts in moderation logs.',
    main: function(bot, msg) {
        const Discord = require('discord.js');
        var banee = msg.mentions.users.array()[0];

        if (msg.member.hasPermission('BAN_MEMBERS') === true || msg.member.hasPermission('ADMINISTRATOR') === true) {
            try {
                var banned = msg.guild.members.get(banee.id);
                var user = bot.users.get(banee.id);
                var guild = msg.guild;
                var reason = msg.content.split(' ').splice(1).join(' ');

                if (reason === '') {
                    reason = 'Not specified.';
                }

                banned.ban(reason);

                msg.reply(banee + ' has been successfullly banned.');

                var ban = new Discord.RichEmbed();
                ban.setColor(0xFFB200)
                    .setAuthor(user.username, user.avatarURL)
                    .addField('Member Banned', `**:hammer: ${user.username}#${user.discriminator} (${user.id}) was banned from the server.**`)
                    .addField('Responsible Moderator', msg.member.displayName)
                    .addField('Reason', reason)
                    .setFooter(`${guild.name} | ${guild.members.size} members`, `${guild.iconURL}`)
                    .setTimestamp();

                try {
                    var log = msg.guild.channels.find('name', 'mod-logs');
                    log.send({ embed: ban });
                } catch (e) {
                    msg.channel.send({ embed: ban });
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            msg.reply(' you do not have permission to perform this action!');
        }
    },
};
