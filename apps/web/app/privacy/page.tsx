import Link from "next/link";

export default function Component() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-4 text-regular">
            At GridBox, we are committed to protecting the privacy and security
            of our users. This privacy policy outlines how we collect, use, and
            safeguard your personal information.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Information Collected</h2>
          <p className="mt-4 text-regular">
            When you create an account with GridBox, we collect the following
            information:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-regular">
            <li>Name</li>
            <li>Email address</li>
            <li>Password</li>
            <li>Date of Birth</li>
            <li>Gender</li>
            <li>Contact Number</li>
            <li>Shipping addresses</li>
            <li>Payment information (handled by stripe)</li>
          </ul>
          <p className="mt-4 text-regular">
            This information is necessary for us to provide you with access to
            our ecommerce platform and to communicate with you about your
            account and orders.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Password Hashing</h2>
          <p className="mt-4 text-regular">
            We take the security of your account very seriously. Before storing
            your password in our database, we use a secure hashing algorithm to
            ensure that your password is protected and cannot be accessed by
            unauthorized parties.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Data Sharing</h2>
          <p className="mt-4 text-regular">
            We do not share your personal information with any third-party
            organizations. Your data is used solely for the purpose of providing
            you with our ecommerce services and communicating with you about
            your account and orders.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Email Verification</h2>
          <p className="mt-4 text-regular">
            When you create a new account with GridBox, we will send you an
            email to verify your email address. This helps us ensure that the
            email address you provided is valid and that you have access to it.
            Once you have verified your email address, you can begin using your
            GridBox account.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="mt-4 text-regular">
            If you have any questions or concerns about our privacy policy,
            please don&apos;t hesitate to contact us at{" "}
            <Link className="text-primary underline" href="#">
              harshdagar@hdxdev.in
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
