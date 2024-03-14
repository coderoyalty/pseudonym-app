import React from "react";

const pad = (num: number) => {
  return num.toString().padStart(2, "0");
};

/**
 *
 * @param duration duration to start counting from in seconds
 * @returns time in xy:yx format
 */
const formatTime = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
};

interface TimerProps {
  duration: number;
  updateDuration: (duration: number) => void;
  render?: (time: string) => JSX.Element;
}

const Timer: React.FC<TimerProps> = ({
  duration,
  updateDuration,
  render = (time) => <>{time}</>,
}) => {
  const [timeLeft, setTimeLeft] = React.useState(formatTime(duration));

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (duration <= 0) {
        setTimeLeft("00:00");
        clearInterval(interval);
        // You might want to handle the completion of the timer here
      } else {
        const newDuration = duration - 1;
        setTimeLeft(formatTime(newDuration));
        updateDuration(newDuration);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, updateDuration]);

  return render(timeLeft);
};

export default Timer;
