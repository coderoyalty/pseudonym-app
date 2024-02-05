import { createBoard } from "@wixc3/react-board";
import { Button } from "../../components/ui/button";

export default createBoard({
  name: "Home",
  Board: () => (
    <div>
      <Button />
    </div>
  ),
  isSnippet: true,
  environmentProps: {
    canvasWidth: 362,
    canvasHeight: 22,
  },
});
