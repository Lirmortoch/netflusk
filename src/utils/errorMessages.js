export const loginErrorMessages = {
  SESSION_NOT_FOUND:
    "Looks like your session wandered off. Sign in again to get back to the show.",
  SESSION_EXPIRED:
    "Your session ran out of popcorn. Sign in again to keep watching.",
  REQUEST_TOKEN_FAILED:
    "The login didn't even get to the opening credits. Give it another go in a moment.",
  ACCESS_DENIED:
    "The login didn't get the green light. Try again and hit Approve when TMDB asks.",
  USER_FETCH_FAILED:
    "You're signed in, but your profile missed its cue. Try reloading the page.",
  NETWORK:
    "Can't reach the server. Check your connection and try again.",
  DEFAULT:
    "Something hiccuped while signing you in. Give it another try.",
};
export const toLoginErrorCode = (rawMessage = '') => {
  const msg = String(rawMessage).toLowerCase();

  if (msg.includes('session denied')) return 'ACCESS_DENIED';
  if (msg.includes('failed to fetch') || msg.includes('networkerror')) return 'NETWORK';
  if (msg.includes('http 401')) return 'SESSION_EXPIRED';

  return 'DEFAULT';
};



export const getErrorMessage = (code, map) => map[code] ?? map.DEFAULT;

export const createError = (code, msg) => ({error: code, message: msg});

export const normalizeErrorCode = (err, normalizeFnc) => {
  const msg = typeof err === 'string' ? err : err?.message ?? '';
  return msg in loginErrorMessages ? msg : normalizeFnc(msg);
}