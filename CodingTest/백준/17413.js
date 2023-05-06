const input = require('fs').readFileSync('/dev/stdin').toString().trim();
console.log(input.replace(/<[a-z0-9 ]+>|[a-z0-9]+/g, (match) => {
  if (match.startsWith('<')) {
    return match;
  }
  return [...match].reverse().join('');
}));