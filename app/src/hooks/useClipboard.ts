import React from "react";

const useClipboard = (reset = 2000) => {
  const [copied, setCopied] = React.useState(false);

  const copy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), reset);
      })
      .catch(() => {
        console.log("unable to copy");
      });
  };

  return { copied, copy };
};

export default useClipboard;
