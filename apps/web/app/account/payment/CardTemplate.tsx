"use client";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  Button,
  DropDownMenu as DDM,
  Dialog as Dg,
  Card as Crd,
} from "@repo/ui";
import type { PaymentMethod } from "@stripe/stripe-js";
import FormButton from "@components/FormButton";
import { removePaymentMethod } from "@lib/stripe/actions.server";

const {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} = DDM;

const {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
} = Dg;

const { Card, CardContent, CardHeader, CardFooter, CardDescription } = Crd;

export default function CardTemplate({
  CardInfo,
  methodId,
  removeMethod,
}: {
  CardInfo: PaymentMethod.Card;
  methodId: string;
  removeMethod: (methodId: string) => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [state, action] = useFormState(
    removePaymentMethod.bind(null, methodId),
    undefined
  );

  useEffect(() => {
    if (state) {
      setOpenDialog(false);
      removeMethod(methodId);
    }
  }, [state, removeMethod, methodId]);

  return (
    <Card className="shadow-md rounded-lg min-w-64 w-fit aspect-video relative p-3 pr-6 flex flex-col justify-between">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>{CardInfo.country}</div>
        <div className="uppercase text-xl">{CardInfo.brand}</div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xl font-mono">
          **** **** **** {CardInfo.last4}
        </CardDescription>
      </CardContent>
      <CardFooter className="w-full flex justify-between">
        <div className="text-xs">
          Expiry: {CardInfo.exp_month} / {CardInfo.exp_year}
        </div>
        <div className="text-xs">Secured</div>
      </CardFooter>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="cursor-pointer absolute top-3 right-0.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-surface-secondary min-w-16"
        >
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setTimeout(setOpenDialog, 0, true)}
          >
            Remove Card
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog onOpenChange={setOpenDialog} open={openDialog}>
        <DialogPortal>
          <DialogContent className="bg-surface-secondary text-regular">
            <DialogHeader>
              <DialogTitle className="text-xl">Delete Card</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to delete this card? This action cannot be
              undone.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => setOpenDialog(false)} variant="outline">
                Cancel
              </Button>
              <form action={action}>
                <FormButton className="text-regular-inverted">
                  Delete
                </FormButton>
              </form>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </Card>
  );
}
