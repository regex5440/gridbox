"use client";

import { Button, Dialog, Input } from "@repo/ui";
import { ALGORITHM_MAP } from "@utils/enums";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

type CreatePsKProps = {
  userId: string;
  userName: string;
  userEmail: string;
  challenge: string;
  rpId: string;
  rpName: string;
};

export default function CreatePasskey({
  challenge,
  userId,
  userEmail,
  userName,
  rpId,
  rpName,
  onSuccessAction,
  challengeId,
}: CreatePsKProps & {
  challengeId: string;
  onSuccessAction: (state: any, fd: FormData) => string | Promise<string>;
}) {
  const [showError, setShowError] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [passkeyData, setPasskeyData] = useState<{
    challengeId: string;
    id: string;
    name: string;
    response: {
      clientDataJSON: string;
      publicKey: string;
      publicKeyAlgorithm: string;
    };
  } | null>(null);
  const [submissionError, action, isLoading] = useFormState(
    onSuccessAction,
    null
  );

  useEffect(() => {
    if (submissionError && submissionError !== "noerr") {
      setShowError(true);
    } else if (submissionError === "noerr") {
      setShowNameModal(false);
      window.location.reload();
    }
  }, [submissionError]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  async function handleNewPasskeyCreation() {
    try {
      const isAvailable =
        await PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable();
      if (!isAvailable) {
        alert("Passkey creation is not supported on this device/browser.");
        return;
      }
      //@ts-expect-error - Issues with TS for WebAuthn APIs
      const _options = PublicKeyCredential.parseCreationOptionsFromJSON({
        challenge,
        rp: {
          name: rpName,
          id: rpId,
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },
          { alg: -257, type: "public-key" },
        ],
        user: {
          id: userId,
          name: userEmail,
          displayName: userName,
        },
        timeout: 60000,
        attestation: "direct",
      });
      const pr = (await navigator.credentials.create({
        publicKey: _options,
      })) as PublicKeyCredential | null;
      if (pr && pr.type === "public-key") {
        //@ts-expect-error - Issues with TS for WebAuthn APIs
        const prJson = pr.toJSON();
        prJson.name = "New Passkey " + crypto.randomUUID().slice(0, 5);
        prJson.challengeId = challengeId;
        prJson.response.publicKeyAlgorithm =
          ALGORITHM_MAP[prJson.response.publicKeyAlgorithm];
        setPasskeyData(prJson);
        setShowError(false);
        setShowNameModal(true);
        return;
      }
    } catch (e: any) {
      if (e?.name === "NotAllowedError") {
        return;
      }
      setShowError(true);
      console.error(e);
    }
  }
  return (
    <>
      <Button
        className="text-white gap-1 mt-2"
        size={"sm"}
        onClick={handleNewPasskeyCreation}
      >
        <Plus size={16} />
        Add new
      </Button>
      <Dialog.Dialog open={showError} onOpenChange={setShowError}>
        <Dialog.DialogContent className="bg-white">
          <Dialog.DialogTitle>Error creating passkey</Dialog.DialogTitle>
          <Dialog.DialogDescription>
            {submissionError ||
              "There was an error while creating the passkey. Please try again."}
          </Dialog.DialogDescription>
          <Dialog.DialogClose asChild>
            <Button variant="outline" size={"sm"} className="w-fit">
              Close
            </Button>
          </Dialog.DialogClose>
        </Dialog.DialogContent>
      </Dialog.Dialog>
      <Dialog.Dialog open={showNameModal} onOpenChange={setShowNameModal}>
        <Dialog.DialogContent className="bg-white">
          <form action={action}>
            <Dialog.DialogTitle>Passkey Created</Dialog.DialogTitle>
            <Dialog.DialogDescription>
              Set a name for your new passkey
            </Dialog.DialogDescription>
            {passkeyData && (
              <>
                <Input type="hidden" name="credId" value={passkeyData.id} />
                <Input
                  type="hidden"
                  name="challengeId"
                  value={passkeyData.challengeId}
                />
                <Input
                  type="hidden"
                  name="clientDataJSON"
                  value={passkeyData.response.clientDataJSON}
                />
                <Input
                  type="hidden"
                  name="publicKey"
                  value={passkeyData.response.publicKey}
                />
                <Input
                  type="hidden"
                  name="publicKeyAlgorithm"
                  value={passkeyData.response.publicKeyAlgorithm}
                />
              </>
            )}
            <Input
              type="text"
              placeholder="e.g. My MacBook Pro"
              className="mt-4"
              required
              name="name"
              pattern="[\w\s]{3,30}"
              defaultValue={passkeyData?.name || ""}
            />
            <Dialog.DialogFooter className="mt-4">
              <Dialog.DialogClose asChild>
                <Button variant="outline" size={"sm"} className="w-fit">
                  Close
                </Button>
              </Dialog.DialogClose>
              <Button
                className="w-fit text-white"
                size="sm"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <Loader2 className="animate-infiniteRotate" />
                ) : (
                  "Save"
                )}
              </Button>
            </Dialog.DialogFooter>
          </form>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}
