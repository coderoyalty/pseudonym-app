import React from "react";
import MessageCarousel from "../message-carousel";
import CopyableInput from "../copyable-input";

const user = {
  username: "coderoyalty",
  email: "royalty@code.com",
  messageCount: 50,
  archived: 25,
  messages: [
    "You are capable of achieving greatness. Don't let doubts hold you back. Believe in yourself and your abilities. Remember that every setback is an opportunity for growth. Embrace challenges and keep pushing forward. Your resilience will lead you to success.",
    "Life is full of ups and downs, but you have the strength to overcome any obstacle. Stay focused on your goals and don't be afraid to ask for help when you need it. You are not alone on this journey. Keep moving forward with confidence.",
    "Your kindness and compassion make a difference in the lives of those around you. Never underestimate the power of a simple act of kindness. Your positivity brightens the world. Keep spreading love and positivity wherever you go.",
    "Believe in yourself and your abilities. You have the power to create the life you want. Stay focused on your goals and take consistent action towards achieving them. Remember that every small step forward brings you closer to your dreams.",
    "Don't be afraid to step out of your comfort zone and try new things. Growth happens when you push past your limits and embrace new challenges. Trust in your abilities and believe in your potential. You are capable of amazing things.",
    "Take time to appreciate the beauty of life and the world around you. Find joy in the little things and cherish every moment. Remember that happiness comes from within. Cultivate gratitude and positivity in your life.",
    "You are stronger than you know. You have overcome challenges before and you will overcome them again. Trust in your resilience and your ability to adapt to any situation. Keep moving forward with determination and courage.",
    "Life is a journey filled with twists and turns, but you have the power to chart your own course. Stay true to yourself and follow your heart. Trust in the path you are on and believe in the possibilities that lie ahead.",
    "The road to success is not always easy, but it is worth the effort. Stay focused on your goals and keep pushing forward. Remember that every setback is an opportunity to learn and grow. Believe in yourself and your ability to overcome any obstacle.",
    "You are capable of achieving anything you set your mind to. Believe in yourself and your abilities. Stay focused on your goals and don't let fear or doubt hold you back. Keep pushing forward and never give up on your dreams.",
  ],
};

const UserStatsPanel = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-evenly gap-0 sm:gap-2 divide-y sm:divide-y-0 divide-x-0 sm:divide-x border-b">
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          <span className="text-5xl">{user.messageCount}</span>
          <span>messages received</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-4">
          <span className="text-5xl">{user.archived}</span>
          <span>messages archived</span>
        </div>
      </div>
    </>
  );
};

const DashboardHome: React.FC = () => {
  const url = `https://pseudonym.app/${user.username}`;

  return (
    <>
      <UserStatsPanel />
      <div className="p-4">
        <h1 className="font-medium">
          Username: <span className="text-blue-600">{user.username}</span>
        </h1>
        <h1 className="font-medium">Email: {user.email}</h1>
      </div>

      <CopyableInput value={url} />

      <div className="relative max-w-full">
        <MessageCarousel messages={user.messages} />
      </div>
    </>
  );
};

export default DashboardHome;
