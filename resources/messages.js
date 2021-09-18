
const { emojis } = require('./emojis');
const dogEmoji = emojis.DOG;
const catEmoji = emojis.CAT;

const messages = {
    REACTIONROLES: 'React to this message to receive a role:\n' +
        `${dogEmoji}: Dog role.\n` +
        `${catEmoji}: Cat role.`,
}

module.exports = {
    messages,
}