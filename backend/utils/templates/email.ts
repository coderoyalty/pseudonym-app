const verifyEmailHTML = (
	name: string,
	verificationLink: string,
	verificationCode: string,
) =>
	`
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      /* Add CSS styles here to style the HTML email */
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
        border-radius: 10px;
      }
      .email-heading {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
      }
      .email-content {
        font-size: 16px;
        color: #666666;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h2 class="email-heading">Verify Your Email Address</h2>
      <p class="email-content">
        Thank you for signing up! To complete your registration, please verify
        your email address by entering the following verification code:
      </p>
      <p class="email-content">
        <strong>Verification Code:</strong>
        <span id="verification-code">${verificationCode}</span>
      </p>
      <p>Verification code expires in 10 minutes.</p>
      <p class="email-content">
        Enter the verification code on the registration page to activate your
        account.
      </p>
      <a href="https://pseudonym-app" class="button">Verify Email</a>
    </div>
  </body>
</html>
`;

const requestEmailVerificationHTML = (
	name: string,
	verificationCode: string,
) => {
	return `
  <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      /* Add CSS styles here to style the HTML email */
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
        border-radius: 10px;
      }
      .email-heading {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
      }
      .email-content {
        font-size: 16px;
        color: #666666;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h2 class="email-heading">Verify Your Email Address</h2>
      <p class="email-content">
        ${name}, please verify your email address by entering the following
        verification code:
      </p>
      <p class="email-content">
        <strong>Verification Code:</strong>
        <span id="verification-code">${verificationCode}</span>
      </p>
      <p>Verification code expires in 10 minutes.</p>
      <p class="email-content">
        Enter the verification code on the registration page to activate your
        account.
      </p>
    </div>
  </body>
</html>
`;
};

export { verifyEmailHTML, requestEmailVerificationHTML };
