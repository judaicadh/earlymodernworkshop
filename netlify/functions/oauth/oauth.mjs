// netlify/functions/oauth/oauth.mjs
// GitHub OAuth proxy for Decap CMS (ESM)

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  OAUTH_REDIRECT_URI,
  GITHUB_SCOPES = 'public_repo', // use 'repo' if your repo is private
} = process.env;

function htmlPopup(body) {
  return `<!doctype html><meta charset="utf-8">
<script>
  (function() {
    function send(result) {
      if (window.opener) {
        window.opener.postMessage('authorization:github:' + JSON.stringify(result), '*');
        window.close();
      } else {
        document.body.textContent = 'Result: ' + JSON.stringify(result);
      }
    }
    ${body}
  })();
</script>`;
}

export async function handler(event) {
  const url = new URL(event.rawUrl);
  const path = url.pathname;

  // 1) Start OAuth: redirect to GitHub
  if (path.endsWith('/oauth') || path.endsWith('/oauth/')) {
    const authURL = new URL('https://github.com/login/oauth/authorize');
    authURL.searchParams.set('client_id', GITHUB_CLIENT_ID);
    authURL.searchParams.set('redirect_uri', OAUTH_REDIRECT_URI);
    authURL.searchParams.set('scope', GITHUB_SCOPES);
    authURL.searchParams.set('allow_signup', 'true');

    return {
      statusCode: 302,
      headers: { Location: authURL.toString() },
      body: '',
    };
  }

  // 2) Callback: exchange code for token and pass to Decap
  if (path.endsWith('/oauth/callback')) {
    const code = url.searchParams.get('code');
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: OAUTH_REDIRECT_URI,
    });

    const resp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: params,
    });
    const data = await resp.json();

    if (!data.access_token) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: htmlPopup(`send({ error: ${JSON.stringify(data)} });`),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: htmlPopup(`send({ token: ${JSON.stringify(data.access_token)} });`),
    };
  }

  return { statusCode: 404, body: 'Not found' };
}