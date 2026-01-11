import {
  createChallenge,
  getPasskeys,
  savePasskey,
  validateChallenge,
} from "controllers/account";
import CreatePasskey from "./CreatePasskey";
import { getAuthenticUserGeneralInfo } from "@actions/auth";
import KeyCard from "./KeyCard";

export default async function Passkeys({
  user,
}: {
  user: Required<
    Pick<Awaited<ReturnType<typeof getAuthenticUserGeneralInfo>>, "data">
  >;
}) {
  const userId = user.data.id;
  const passkeys = await getPasskeys(userId);
  const challenge = await createChallenge();

  async function onPasskeyCreated(_: null, fd: FormData) {
    "use server";
    const name = fd.get("name") as string;
    const credId = fd.get("credId") as string;
    const clientData = fd.get("clientDataJSON") as string;
    const publicKey = fd.get("publicKey") as string;
    const challengeId = fd.get("challengeId") as string;
    const algorithm = fd.get("publicKeyAlgorithm") as string;

    if (!credId || !clientData || !publicKey || !challengeId || !algorithm) {
      return "Incomplete passkey data received.";
    }

    if (!name || !/[\w\ ]{3,30}/.test(name)) {
      return "Please enter a valid name (3-30 alphanumeric characters or spaces).";
    }
    const isValid = validateChallenge(challengeId, clientData);
    if (!isValid) {
      return "Invalid challenge";
    }

    const data = await savePasskey({
      userId,
      name,
      pkey: publicKey,
      credId,
      algorithm,
    });

    if (!data.id) {
      return "Failed to save passkey";
    }
    return "noerr";
  }
  return (
    <div>
      <h3 className="font-semibold mb-2 underline">Passkeys</h3>
      {passkeys.length === 0 && <p className="text-sm">No passkeys saved.</p>}
      <div className="flex flex-col gap-2">
        {passkeys.map((passkey) => (
          <KeyCard key={passkey.id} passkey={passkey} />
        ))}
      </div>
      <CreatePasskey
        challenge={challenge.challenge}
        userId={Buffer.from(userId).toString("base64url")}
        userEmail={user.data.email}
        userName={`${user.data.firstName} ${user.data.lastName}`.trim()}
        challengeId={challenge.challengeId}
        rpId={process.env.RPID || "localhost"}
        rpName="GridBox"
        onSuccessAction={onPasskeyCreated}
      />
    </div>
  );
}
