interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const isTestsHost = url.hostname === 'tests.rapscli.xyz';

    if (isTestsHost && (url.pathname === '/' || url.pathname === '/index.html')) {
      return Response.redirect(new URL('/tests/', url), 302);
    }

    if (isTestsHost && url.pathname === '/_vercel/insights/script.js') {
      return new Response('', {
        headers: {
          'content-type': 'application/javascript; charset=utf-8',
          'cache-control': 'public, max-age=300',
        },
      });
    }

    if (isTestsHost && url.pathname === '/api/analytics') {
      return new Response(null, {
        status: 204,
        headers: {
          'cache-control': 'no-store',
        },
      });
    }

    const response = await env.ASSETS.fetch(request.url, request);
    return new Response(response.body, response);
  },
};
