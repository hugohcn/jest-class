import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const doSearch = jest.fn();

describe('Search Unit Test', () => {
  it('should render component', () => {
    render(<Search doSearch={doSearch} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should render a type equals search', () => {
    render(<Search doSearch={doSearch} />);
    const search = screen.getByRole('searchbox');
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('type', 'search');
  });

  it('should call props.doSearch() when form is submitted', async () => {
    render(<Search doSearch={doSearch} />);
    const form = screen.getByRole('form');
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it('should call props.doSearch() with the user input', async () => {
    render(<Search doSearch={doSearch} />);

    const inputText = 'some thing here...';
    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(inputText);
    expect(doSearch).toHaveBeenCalledTimes(2);
  });

  it('should call doSearch when search input is cleared', async () => {
    render(<Search doSearch={doSearch} />);

    const inputText = 'some text here';
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await userEvent.clear(input);

    expect(doSearch).toHaveBeenCalledTimes(1);
    expect(doSearch).toHaveBeenCalledWith('');
  });
});
