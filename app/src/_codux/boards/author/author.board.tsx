import { createBoard } from '@wixc3/react-board';
import Author from '../../../components/Author';

export default createBoard({
    name: 'Author',
    Board: () => <Author />,
    isSnippet: true,
    environmentProps: {
canvasWidth: 776,
windowWidth: 300,
windowHeight: 400
}
});
