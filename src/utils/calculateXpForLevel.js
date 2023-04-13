/**
 * Calculate the amount of xp needed for a certain level
 * @param {Number} level - level desired
 * @returns number of xp needed for specified level
 */
module.exports = (level) => {
    const x = 0.3;
    const y = 2;

    const xp = (level / x) ^ y
    return xp
};