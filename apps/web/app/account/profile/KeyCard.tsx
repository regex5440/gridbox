"use client";

import { deletePasskeyAction } from "@actions/account";
import { Button, Dialog, Loader } from "@repo/ui";
import { type Passkey } from "controllers/account";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function KeyCard({ passkey }: { passkey: Passkey }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div key={passkey.id} className="flex justify-between p-2 border">
      <div>
        <p>{passkey.name}</p>
        <p className="italic text-gray-600 text-xs">
          Saved at:{" "}
          {Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(passkey.createdAt)}
        </p>
      </div>
      <div>
        {isDeleting ? (
          <Loader />
        ) : (
          <Trash2
            className="cursor-pointer"
            onClick={setShowDialog.bind(null, true)}
          />
        )}
      </div>
      <Dialog.Dialog open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.DialogContent className="bg-white">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Delete Passkey?</Dialog.DialogTitle>
            <Dialog.DialogDescription>
              Are you sure you want to delete the passkey{" "}
              <strong>{passkey.name}</strong>? This action cannot be undone.
            </Dialog.DialogDescription>
          </Dialog.DialogHeader>
          <div className="flex gap-2 justify-end mt-4">
            <Dialog.DialogClose asChild>
              <Button size={"sm"} variant={"outline"}>
                Cancel
              </Button>
            </Dialog.DialogClose>
            <Button
              variant="destructive"
              size={"sm"}
              onClick={async () => {
                try {
                  setIsDeleting(true);
                  await deletePasskeyAction(passkey.id);
                  window.location.reload();
                } catch (err) {
                  console.error("Error deleting passkey:", err);
                } finally {
                  setIsDeleting(false);
                }
              }}
              disabled={isDeleting}
            >
              {isDeleting ? <Loader className="text-white" /> : "Delete"}
            </Button>
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </div>
  );
}
