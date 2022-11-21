/* eslint-disable camelcase */
/* eslint-disable no-console */
import Router from '@koa/router';

import axios from 'axios';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import prisma from '../client.js';

dotenv.config();

const router = new Router({ prefix: '/auth' });

const development = process.env.NODE_ENV === 'development';

// Get GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET from environment variables
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

// Check that GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are not empty
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  console.error('⚠️ GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set');
  process.exit(1);
}
// Check that JWT_SECRET is not empty
if (!process.env.JWT_SECRET) {
  console.error('⚠️ JWT_SECRET must be set');
  process.exit(1);
}

// Login endpoint (redirects to GitHub)
router.get('/login', async (ctx) => {
  let redirectUri = `${ctx.origin}/api/auth/callback`;
  if (development && process.env.FRONTEND_URL) {
    // Use a proxied redirect URI
    // Replace localhost with 127.0.0.1
    const frontend_url = process.env.FRONTEND_URL.replace('localhost', '127.0.0.1');
    redirectUri = `${frontend_url}/api/auth/callback`;
  } else if (process.env.BACKEND_URL) {
    // Use a public redirect URI
    redirectUri = `${process.env.BACKEND_URL}/auth/callback`;
  } else {
    // Use the default redirect URI
    redirectUri = `${ctx.origin}/auth/callback`;
  }
  console.debug(redirectUri);

  const scope = 'read:user user:email';
  const url = 'https://github.com/login/oauth/authorize';

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope,
    // TODO: Add CSRF protection
  });
  ctx.redirect(`${url}?${params}`);
});

router.get('/logout', async (ctx) => {
  ctx.cookies.set('token', null);
  ctx.redirect('/?logout=true');
});

// GitHub OAuth
router.get('/callback', async (ctx) => {
  // Visita http://127.0.0.1:3000/api/auth/callback?code=sdfjkdsfjkdfsjkdfskj
  if (!ctx.query.code) {
    ctx.throw(400, 'No code provided');
  }
  const { code } = ctx.query;
  // Exchange code for access token
  const response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    code,
  }, {
    headers: {
      Accept: 'application/json',
    },
  });
  const { access_token } = response.data;
  // Get user data from GitHub
  const { data: userData } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const { login } = userData;
  const member = await prisma.member.findUnique({
    where: {
      username: login,
    },
  });
  if (!member) {
    // TODO: Replace with a better error page
    ctx.status = 404;
    ctx.body = {
      message: `Member ${login} not found`,
    };
    return;
  }
  // Create JWT
  // TODO: Add expiration and use refresh tokens
  // TODO: Change algorithm to RS256
  const token = jwt.sign({ username: member.username, role: member.role }, process.env.JWT_SECRET);
  // Redirect to frontend
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  if (member.role === 'CHAIR') {
    ctx.redirect(`${frontendUrl}/admin?token=${token}`);
  } else {
    ctx.redirect(`${frontendUrl}/?token=${token}`);
  }
});

// Debugging routes
if (development) {
  router.get('/debug/login', async (ctx) => {
    // Login as an arbitrary username
    const { username } = ctx.query;
    const member = await prisma.member.findUnique({
      where: {
        username,
      },
    });
    if (!member) {
      // Return 404
      ctx.status = 404;
      ctx.body = {
        message: `Member ${username} not found`,
      };
    }
    // Create JWT
    const token = jwt.sign({
      username: member.username,
      role: member.role,
    }, process.env.JWT_SECRET);

    // Redirect to frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    if (member.role === 'CHAIR') {
      ctx.redirect(`${frontendUrl}/admin?token=${token}`);
    } else {
      ctx.redirect(`${frontendUrl}/?token=${token}`);
    }
  });

  router.get('/debug/token', async (ctx) => {
    // Login as an arbitrary username
    const { username } = ctx.query;
    const member = await prisma.member.findUnique({
      where: {
        username,
      },
    });
    if (!member) {
      // Return 404
      ctx.status = 404;
      ctx.body = {
        message: `Member ${username} not found`,
      };
    }
    // Create JWT
    const token = jwt.sign({
      username: member.username,
      role: member.role,
    }, process.env.JWT_SECRET);

    ctx.body = {
      token,
    };
  });
}
export default router;
