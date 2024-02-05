import React from "react";

export interface HeroProps extends React.ComponentPropsWithoutRef<"section"> {}

export const HeroSection: React.FC<HeroProps> = ({}) => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center">
      <h1 className="text-center">
        <span className="text-3xl font-bold text-fuchsia-500">Pseudonym?</span>
      </h1>
      <p className="mx-auto max-w-[600px] p-8 text-lg text-center font-medium">
        Pseudonym? It's like dropping an anonymous bomb on the digital
        playground, where secrets fly faster than a gossip mill on steroids.
        Think of it as your personal confessional without the guilt or judgment.
        Just drop your truth bombs and watch the chaos unfold, all while hiding
        behind the safety of a clever pseudonym. It's where honesty meets
        anonymity, and things get real... real fast.
      </p>
    </section>
  );
};
