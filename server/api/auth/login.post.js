`use strict`;

export default defineEventHandler(async event => {
  const body = await readBody(event);
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  try {
    const data = await $fetch(`${apiBase}/auth/login`, {
      method: `POST`,
      body: body,
      headers: {
        Accept: 'application/json',
      },
    });

    setCookie(event, `login_token`, data.data.login_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1week
      path: `/`,
    });

    console.log(data);
    return `Login Success`;
  } catch (error) {
    console.error(error);
    return error;
  }
});
