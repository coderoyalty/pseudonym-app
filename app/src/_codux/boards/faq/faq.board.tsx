import { createBoard } from '@wixc3/react-board';
import { FAQ } from '../../../components/faq/faq';

export default createBoard({
    name: 'FAQ',
    Board: () => <FAQ />,
    isSnippet: true,
    environmentProps: {
windowWidth: 518
}
});
