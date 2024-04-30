function EmailVerificationTemplate({
  verificationLink,
}: {
  verificationLink: string;
}) {
  return `
  <div style="font-family: inter, sans-serif; border: 1px solid black; width:fit-content;margin:auto; padding: 8px 12px; max-width: 280px;">
  <h2 style="color: rgb(50, 98, 115);">Gadget/Grid</h2>
    <h1>Email Verification</h1>
    <p>Click the link below to verify your email address</p>
   <p style="text-align:center;"> <a href="${verificationLink}" style="text-align:center; margin:auto; text-decoration: none; background-color: rgb(50, 98, 115); color: rgb(248, 250, 252); padding: 8px 12px; border-radius: 4px; font-size: 20px; ">Verify Email</a>
  </p>
  <p style="text-align:center;">OR</p>
    <p>Copy and paste the link below in your browser</p>
    <p>${verificationLink}</p>
  <p style="text-align:center; font-size: 12px; color: grey;font-style: italic; margin-top: 20px;">2024 © Gadget/Grid</p>
  </div>
  `;
}
class EmailTemplate {
  protected template: typeof EmailVerificationTemplate;
  protected arguments: any;
  constructor(emailType: "verification") {
    switch (emailType) {
      case "verification":
        this.template = EmailVerificationTemplate;
    }
  }
  values(
    values: typeof this.template extends (values: infer T) => string ? T : never
  ) {
    this.arguments = values;
    return this;
  }
  toHTML() {
    return this.template.call(null, this.arguments);
  }
}

export default EmailTemplate;
