import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface AdminModalProps {
  triggerLabel: string;
  title: string;
  children?: ReactNode;
  variant?: "default" | "outline";
}

export default function AdminModal({ triggerLabel, title, children, variant = "default" }: AdminModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant === "outline" ? "outline" : undefined} size="sm">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Use these controls to manage the section.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{children}</div>
        <DialogFooter>
          <Button variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
