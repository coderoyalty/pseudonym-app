import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@radix-ui/themes";

export interface FAQProps extends React.ComponentPropsWithoutRef<"section"> {}

export const FAQ: React.FC<FAQProps> = ({}) => {
  return (
    <section id="faq" className="scroll-my-14 mt-4">
      <h1 className="text-center text-2xl font-medium mb-4">
        Frequently Asked Questions
      </h1>
      <div className="max-w-[720px] max-md:max-w-[450px] max-md:p-4 mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-0">
            <AccordionTrigger>What is this App for?</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal ml-5">
                <li>
                  For receiving anonymous questions, compliments, opinions,
                  advices.
                </li>
                <li>
                  For sending comments, opinions without revealing your
                  identity.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger>Who built it?</AccordionTrigger>
            <AccordionContent>
              A random person from Nigeria. (Can't reveal my identity... Lol!
              It's the first order of this business!!!)
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1b">
            <AccordionTrigger>How do I share my link?</AccordionTrigger>
            <AccordionContent>
              Your link should looks something like this:
              <Badge> {"https://pseudonym.vercel.app/@<username>"}</Badge>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it secured?</AccordionTrigger>
            <AccordionContent>
              Yes. Your messages can only be shared by you (usually by taking a
              screenshot.)
              <br />
              However, the senders identity is not available (anonymous).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Can I have more than one account?
            </AccordionTrigger>
            <AccordionContent>
              No. Each account is unique by the handle name and the verification
              email. The email address is required for resetting your password
              and for account recovery.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              How many times can I change my handle name?
            </AccordionTrigger>
            <AccordionContent>
              Infinitely. But note that your previous handle name will be
              available for others to use.
              <br />
              e.g if I switch from <Badge>@code</Badge> to
              <Badge>@codeofficial</Badge>, any user can use the
              <Badge>@code</Badge>
              handle; if this happens, there's no way to recover the handle
              again.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Can I recover my account?</AccordionTrigger>
            <AccordionContent>
              If you delete your account, we cannot recover it, so please be
              careful.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
