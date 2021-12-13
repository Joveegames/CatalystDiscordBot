
const { emojis } = require('./emojis');
const verifiedEmoji = emojis.VERIFIED;
const communityAdvisorEmoji = emojis.COMMUNITYADVISOR;
const proposerEmoji = emojis.PROPOSER;
const cohortMemberEmoji = emojis.COHORTMEMBER;
const publicVoterEmoji = emojis.PUBLICVOTER;
const devForHireEmoji = emojis.DEVFORHIRE;
const designerForHireEmoji = emojis.DESIGNERFORHIRE;
const proposalMentorEmoji = emojis.PROPOSALMENTOR;
const challengeTeamEmoji = emojis.CHALLENGETEAM;

const messages = {
    REACTIONROLES: `Choose a role to recognize your interest.

${verifiedEmoji} **Verified** - Choose this role, to show that you are human. (This is action is required to filter our weak spam bots which like to send us scam messages)
${communityAdvisorEmoji} **Community Advisor** - Known as CA a role in Catalyst where you assess and score proposals.
${proposerEmoji} **Proposer** - Choose this role if you have proposal active in the current fund.
${cohortMemberEmoji} **Cohort member** - Choose this role if you are working on the funded proposal.
${publicVoterEmoji} **Public Voter** - Choose this role if share your voting ballots with rationale.
${devForHireEmoji} **dev-for-hire** - If you are a developer and looking for team or ideas to use your skills on.
${designerForHireEmoji} **designer-for-hire** - If you are a designer and looking for team or ideas to brush out.
${proposalMentorEmoji} **Proposal Mentor** - If you are interested to improve and help proposers to write proposals.
${challengeTeamEmoji} **Challenge Team** - You are a confirmed challenge team member of current funding round.

Click a reaction corresponding to role name, to show your interest.
This will unlock new channels.
Call command \`/roles\` again to change or expand your adventure.`,
}

module.exports = {
    messages,
}
