function calculateTotalSalary(lineup) {
  return lineup.reduce((salary, player) => {
    return salary + player.salary
  }, 0)
}

function isPositionCounts(lineup) {
  return lineup.reduce((counts, player) => {
    counts[player.position] = counts[player.position] === undefined ? 1 : counts[player.position] + 1

    return counts
  }, {})
}

function isGameCounts(lineup) {
  return lineup.reduce((games, player) => {
    games[player.gameId] = games[player.gameId] === undefined ? 1 : games[player.gameId] + 1

    return games
  }, {})
}

function isTeamCounts(lineup) {
  return lineup.reduce((teams, player) => {
    teams[player.teamId] = teams[player.teamId] === undefined ? 1 : teams[player.teamId] + 1

    return teams
  }, {})
}

function limitGameCount(games) {
  return Object.values(games).some((count) => { return count > 3 })
}

function limitPositionCount(positions) {
  return positions['P'] !== 1 || positions['C'] !== 1 || positions['1B'] !== 1 ||
    positions['2B'] !== 1 || positions['3B'] !== 1 || positions['SS'] !== 1 ||
    positions['OF'] !== 3
}

function limitSalary(lineup) {
  return calculateTotalSalary(lineup) > 45000
}

function limitTeamCount(teams) {
  return Object.values(teams).some((count) => { return count > 2 })
}

function validateLineup(lineup) {
  const gameCounts = isGameCounts(lineup)
  const teamCounts = isTeamCounts(lineup)
  const positionCounts = isPositionCounts(lineup)

  // eslint-disable-next-line max-len
  return !limitGameCount(gameCounts) && !limitSalary(lineup) && !limitTeamCount(teamCounts) && !limitPositionCount(positionCounts)
}

module.exports = validateLineup
