import { createBoard } from "@wixc3/react-board";
import HomePage from "../../../pages/home-page";

export default createBoard({
  name: "HomePage",
  Board: () => <HomePage />,
  isSnippet: true,
  environmentProps: {
    windowWidth: 552,
    windowHeight: 532,
    canvasWidth: 456,
  },
});
