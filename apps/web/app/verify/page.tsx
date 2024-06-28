import { CircleX, Mail, MailCheck } from "lucide-react";
import emailVerify from "@actions/email-verify";
import { Metadata } from "next";

type VerifyPageProps = {
  searchParams: { token?: string };
  // resend: () => void;
};

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const verifyInstructionContent = (
    <div>
      <p>
        <Mail className="text-primary mx-auto" size={70} />
      </p>
      <h1 className="text-center text-2xl">Verify your email</h1>
      <p className="text-center mt-5">
        We have sent an email to your registered email address. Click the link
        in the email to verify your email address.
      </p>
      <p className="text-center mt-2 text-ternary text-sm">
        Please note, verification link will be valid till 24 Hrs
      </p>
      {/* <p className="text-center mt-9">
        Didn&apos;t receive the email?{" "}
        <button
          className="text-blue-500 block mx-auto"
          onClick={() => alert("Not implemented, yet!")}
        >
          Resend
        </button>
      </p> */}
    </div>
  );
  let renderVerifyContent = null;
  if (searchParams.token) {
    const emailVerification = await emailVerify(searchParams.token);

    if (emailVerification?.error) {
      renderVerifyContent = (
        <div>
          <p>
            <CircleX className="text-alert mx-auto" size={70} />
          </p>
          <h1 className="text-center text-2xl">Verification link expired</h1>
          <p className="text-center mt-5">
            You can visit your profile and request for another link
          </p>
        </div>
      );
    } else if (emailVerification?.success) {
      renderVerifyContent = (
        <div>
          <p>
            <MailCheck className="text-primary mx-auto" size={70} />
          </p>
          <h1 className="text-center text-2xl">Email verified</h1>
          <p className="text-center mt-5">
            Your email has been verified. You can now login to your account
          </p>
        </div>
      );
    }
  }
  return (
    <div className="grid place-content-center min-h-[50vh] lg:max-w-[40%] mx-auto">
      {renderVerifyContent || verifyInstructionContent}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Email Verification - GridBox",
  description: "Verify your email address to access your account",
};
