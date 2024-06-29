import { CircleX, Mail, MailCheck } from "lucide-react";
import emailVerify, { sendVerificationEmail } from "@actions/email-verify";
import { Metadata } from "next";
import { getUserById } from "controllers/account";
import { RedirectType, redirect } from "next/navigation";
import SiteMap from "@utils/sitemap";
import Link from "next/link";
import FormButton from "@components/FormButton";

type VerifyPageProps = {
  searchParams: { token?: string; user?: string; resend?: string };
  // resend: () => void;
};

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  let renderVerifyContent = null;
  if (Number(searchParams.resend) >= 2) {
    renderVerifyContent = (
      <h2 className="text-xl">
        Too many attempts, please try again after some time
      </h2>
    );
  } else if (searchParams.token) {
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
  } else if (searchParams.user) {
    const user = await getUserById(searchParams.user);
    if (!user) {
      return redirect("/", RedirectType.replace);
    }
    if (user?.validEmail) {
      renderVerifyContent = (
        <div>
          <p>
            <MailCheck className="text-primary mx-auto" size={70} />
          </p>
          <h1 className="text-center text-2xl">Email already verified!</h1>
          <p className="text-center mt-5">
            Please continue login to your account
          </p>
        </div>
      );
    } else {
      sendVerificationEmail({
        email: user.email,
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName || "",
      });
      renderVerifyContent = (
        <div>
          <p>
            <Mail className="text-primary mx-auto" size={70} />
          </p>
          <h1 className="text-center text-2xl">Verify your email</h1>
          <p className="text-center mt-5">
            We have sent an email to your registered email address. Click the
            link in the email to verify your email address.
          </p>
          <p className="text-center mt-2 text-ternary text-sm">
            Please note, verification link will be valid till 24 Hrs
          </p>
          <p className="text-center mt-9">Didn&apos;t receive the email? </p>
          <form
            action={async () => {
              "use server";
              redirect(
                `${SiteMap.Verify.path}?user=${searchParams.user}&resend=${Number(searchParams.resend || 0) + 1}`
              );
            }}
          >
            <FormButton className="text-blue-500 block mx-auto bg-transparent">
              Resend
            </FormButton>
          </form>
        </div>
      );
    }
  }

  return renderVerifyContent ? (
    <div className="grid place-content-center min-h-[50vh] lg:max-w-[40%] mx-auto">
      {renderVerifyContent}
    </div>
  ) : (
    redirect("/", RedirectType.replace)
  );
}

export const metadata: Metadata = {
  title: "Email Verification - GridBox",
  description: "Verify your email address to access your account",
};
