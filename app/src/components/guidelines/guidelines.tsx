import React from "react";

export interface GuidelinesProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export const Guidelines: React.FC<GuidelinesProps> = ({}) => {
  return (
    <section
      id="guidelines"
      className="scroll-my-14 mt-8 p-8 text-neutral-900 font-medium mb-4"
    >
      <h2 className="text-2xl font-medium text-center mb-4">
        Community Guidelines
      </h2>
      <div className="mx-auto max-w-[720px]">
        <ul className="list-disc pl-5">
          <li className="mb-2">
            <strong>Respect Others:</strong> Treat fellow users with kindness,
            empathy, and respect. Harassment, hate speech, bullying, or any form
            of discrimination will not be tolerated.
          </li>
          <li className="mb-2">
            <strong>Keep it Civil:</strong> Engage in constructive dialogue and
            refrain from engaging in personal attacks, threats, or inflammatory
            remarks.
          </li>
          <li className="mb-2">
            <strong>Protect Privacy:</strong> Respect the privacy of others and
            refrain from sharing personal information or sensitive content
            without consent.
          </li>
          <li className="mb-2">
            <strong>Stay on Topic:</strong> Keep conversations relevant to the
            community and avoid spamming or posting unrelated content.
          </li>
          <li>
            <strong>Report Violations:</strong> If you encounter any content or
            behavior that violates these guidelines, please report it to our
            moderation team for review.
          </li>
        </ul>
        <p className="mt-4">
          By using Pseudonym, you agree to abide by these community guidelines
          and uphold the values of our community. Together, we can create a
          positive and inclusive space for honest and meaningful conversations.
          Thank you for being a part of our community!
        </p>
      </div>
    </section>
  );
};
