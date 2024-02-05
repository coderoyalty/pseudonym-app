import { createBoard } from '@wixc3/react-board';
import { Accordion } from '../../../components/ui/accordion';

export default createBoard({
    name: 'Accordion',
    Board: () => <Accordion />,
    isSnippet: true,
});
