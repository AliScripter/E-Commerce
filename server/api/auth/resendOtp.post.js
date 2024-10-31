`use strict`;

export default defineEventHandler(async event => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const loginToken = getCookie(event, `login_token`);
  console.log(loginToken);

  try {
    const data = await $fetch(`${apiBase}/auth/resend-otp`, {
      method: `POST`,
      body: { login_token: loginToken },
      headers: {
        Accept: 'application/json',
      },
    });

    // set new cookie
    setCookie(event, `login_token`, data.data.login_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1week
      path: `/`,
    });

    return `OTP Resend`;
  } catch (error) {
    console.error(error);
    return error;
  }
});
