import { createBoard } from '@wixc3/react-board';
import { Guidelines } from '../../../components/guidelines/guidelines';

export default createBoard({
    name: 'Guidelines',
    Board: () => <Guidelines />,
    isSnippet: true,
});
