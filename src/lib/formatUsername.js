function formatUsername(username) {
  return username.startsWith("@") ? username : `@${username}`;
}

export function removeUsernameSymbol(username) {
  return username.startsWith("@") ? username.slice(1) : username;
}

export default formatUsername;
