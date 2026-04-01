import { render, screen, fireEvent } from '@testing-library/react';
import RepositorySearch from './RepositorySearch';

describe('RepositorySearch', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    it('renders two inputs and a submit button', () => {
        render(<RepositorySearch onSearch={() => {}} />);
        expect(screen.getByText('Repo 1')).toBeInTheDocument();
        expect(screen.getByText('Repo 2')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /compare/i })).toBeInTheDocument();
    });

    it('does not call onSearch when both fields are empty', () => {
        const onSearch = jest.fn();
        render(<RepositorySearch onSearch={onSearch} />);
        fireEvent.click(screen.getByRole('button', { name: /compare/i }));
        expect(onSearch).not.toHaveBeenCalled();
    });

    it('does not call onSearch when only the first field is filled', () => {
        const onSearch = jest.fn();
        render(<RepositorySearch onSearch={onSearch} />);
        const [input1] = screen.getAllByRole('textbox');
        fireEvent.change(input1, { target: { value: 'facebook/react' } });
        fireEvent.click(screen.getByRole('button', { name: /compare/i }));
        expect(onSearch).not.toHaveBeenCalled();
    });

    it('does not call onSearch when only the second field is filled', () => {
        const onSearch = jest.fn();
        render(<RepositorySearch onSearch={onSearch} />);
        const [, input2] = screen.getAllByRole('textbox');
        fireEvent.change(input2, { target: { value: 'torvalds/linux' } });
        fireEvent.click(screen.getByRole('button', { name: /compare/i }));
        expect(onSearch).not.toHaveBeenCalled();
    });

    it('calls onSearch with both repo paths when both fields are filled', () => {
        const onSearch = jest.fn();
        render(<RepositorySearch onSearch={onSearch} />);
        const [input1, input2] = screen.getAllByRole('textbox');
        fireEvent.change(input1, { target: { value: 'facebook/react' } });
        fireEvent.change(input2, { target: { value: 'torvalds/linux' } });
        fireEvent.click(screen.getByRole('button', { name: /compare/i }));
        expect(onSearch).toHaveBeenCalledTimes(1);
        expect(onSearch).toHaveBeenCalledWith('facebook/react', 'torvalds/linux');
    });

    it('inputs are initially empty', () => {
        render(<RepositorySearch onSearch={() => {}} />);
        const [input1, input2] = screen.getAllByRole('textbox');
        expect(input1.value).toBe('');
        expect(input2.value).toBe('');
    });
});
