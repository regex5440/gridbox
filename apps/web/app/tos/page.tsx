import Link from "next/link";

export default function Terms() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="mb-8 text-3xl font-bold">Terms of Use</h1>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl font-bold">User Accounts</h2>
          <p className="mb-4 text-regular">
            To use the GridBox platform, you must create an account. You are
            responsible for maintaining the confidentiality of your account
            credentials and for any activity that occurs under your account. You
            agree to notify us immediately of any unauthorized use of your
            account or any other breach of security.
          </p>
          <p className="text-regular">
            We reserve the right to suspend or terminate your account at any
            time for any reason, including if we reasonably believe that you
            have violated these Terms of Use.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">
            Intellectual Property Rights
          </h2>
          <p>
            The GridBox platform and all of its content, features, and
            functionality are owned by{" "}
            <Link className="text-regular" href="https://hdxdev.in">
              hdxdev.in
            </Link>{" "}
            and its licensors and are protected by copyright, trademark, and
            other intellectual property laws.
          </p>
          <p className="text-regular">
            You may not modify, copy, distribute, transmit, display, reproduce,
            or create derivative works from the GridBox platform or its content
            without our prior written permission.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">Prohibited Activities</h2>
          <p className="mb-4 text-regular">
            You agree not to use the GridBox platform for any unlawful or
            unauthorized purpose. This includes, but is not limited to, engaging
            in any activity that:
          </p>
          <ul className="list-disc pl-6 text-regular">
            <li>Violates any applicable law or regulation</li>
            <li>Infringes on the rights of others</li>
            <li>Interferes with the operation of the GridBox platform</li>
            <li>
              Attempts to gain unauthorized access to the GridBox platform or
              its systems
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">Disclaimers</h2>
          <p className="mb-4 text-regular">
            The GridBox platform is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without any warranties, express or implied. We do
            not guarantee that the GridBox platform will be error-free,
            uninterrupted, or secure, or that any defects will be corrected.
          </p>
          <p className="text-regular">
            We are not responsible for any delays, delivery failures, or other
            damage resulting from the transfer of data over communication
            networks and facilities, including the internet.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">Limitation of Liability</h2>
          <p className="mb-4 text-regular">
            In no event shall GridBox, its affiliates, or its licensors be
            liable for any indirect, special, incidental, or consequential
            damages arising out of or in connection with the use of the GridBox
            platform, including but not limited to lost profits, business
            interruption, or loss of data.
          </p>
          <p className="text-regular">
            The total liability of GridBox, its affiliates, and its licensors
            shall not exceed $100 or the amount you have paid to GridBox in the
            past 12 months, whichever is greater.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">
            Governing Law and Jurisdiction
          </h2>
          <p className="mb-4 text-regular">
            These Terms of Use shall be governed by and construed in accordance
            with the laws of the state of New Delhi, India, without giving
            effect to any principles of conflicts of law.
          </p>
          <p className="text-regular">
            Any disputes arising out of or in connection with these Terms of Use
            shall be resolved exclusively in the federal or state courts located
            in New Delhi, India.
          </p>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-bold">Stripe Payment</h2>
          <p className="mb-4 text-regular">
            The GridBox platform uses the Stripe test environment for all
            payment processing. By using the platform, you agree to the Stripe
            Terms of Service and Privacy Policy, which can be found at{" "}
            <Link className="text-regular" href="https://stripe.com/legal">
              stripe.com/legal
            </Link>
            . Please do not use your actual payment credentials, as this is a
            test environment.
          </p>
          <p className="text-regular">
            GridBox is not responsible for any issues or disputes that may arise
            from your use of Stripe. If you have any questions or concerns about
            Stripe, please contact Stripe directly.
          </p>
        </section>
      </div>
    </div>
  );
}
