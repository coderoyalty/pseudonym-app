import { createBoard } from '@wixc3/react-board';
import { HeroSection } from '../../../components/hero/hero-section';

export default createBoard({
    name: 'HeroSection',
    Board: () => <HeroSection />,
    isSnippet: true,
});
