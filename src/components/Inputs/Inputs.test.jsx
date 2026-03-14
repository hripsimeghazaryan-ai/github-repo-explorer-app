import { render, screen, fireEvent } from '@testing-library/react';
import Inputs from './Inputs';

describe('Inputs', () => {
    it('renders the label with the given title', () => {
        render(<Inputs title="Repository 1" placeholder="" value="" onChange={() => {}} />);
        expect(screen.getByText('Repository 1')).toBeInTheDocument();
    });

    it('renders a text input with the given placeholder', () => {
        render(<Inputs title="" placeholder="Enter repository name" value="" onChange={() => {}} />);
        expect(screen.getByPlaceholderText('Enter repository name')).toBeInTheDocument();
    });

    it('displays the controlled value', () => {
        render(<Inputs title="" placeholder="" value="facebook/react" onChange={() => {}} />);
        expect(screen.getByDisplayValue('facebook/react')).toBeInTheDocument();
    });

    it('calls onChange when the input value changes', () => {
        const handleChange = jest.fn();
        render(<Inputs title="" placeholder="" value="" onChange={handleChange} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'torvalds/linux' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
