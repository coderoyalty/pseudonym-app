import { createBoard } from '@wixc3/react-board';
import SignupForm from '../../../components/signup-form/signup-form';

export default createBoard({
    name: 'SignupForm',
    Board: () => <SignupForm />,
    isSnippet: true,
});
