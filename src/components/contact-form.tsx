"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormStatus = "idle" | "submitting" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("success");
    event.currentTarget.reset();
  }

  return (
    <form
      aria-live="polite"
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Taylor Jenkins"
          required
          autoComplete="name"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Mobile number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="(512) 555-0130"
            required
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="you@email.com"
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="service">Service need</Label>
        <Input
          id="service"
          name="service"
          placeholder="Whole home steam cleaning"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Notes</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Let us know about stains, pets, square footage, or access notes."
        />
      </div>
      <Button
        type="submit"
        className="w-full gap-2 rounded-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending details...
          </>
        ) : (
          "Request a call"
        )}
      </Button>
      {status === "success" && (
        <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          Thanks! We’ll confirm your appointment shortly.
        </p>
      )}
    </form>
  );
}
