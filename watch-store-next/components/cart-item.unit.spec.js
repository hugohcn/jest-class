import { fireEvent, render, screen } from '@testing-library/react';
import CartItem from './cart-item';

const product = {
  title: 'relógio bonito',
  price: '22.90',
  quantity: 1,
  image:
    'https://images.unsplash.com/photo-1581074652459-2ba81b219e19?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w',
};

describe('Cart Item Unit Test', () => {
  it('should render CartItem component', () => {
    render(<CartItem product={product} />);
    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    render(<CartItem product={product} />);

    const imageElement = screen.getByTestId('image');

    expect(
      screen.getByText(new RegExp(product.title, 'i')),
    ).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(product.price, 'i')),
    ).toBeInTheDocument();

    expect(imageElement).toHaveAttribute('src', product.image);
    expect(imageElement).toHaveAttribute('alt', product.title);
  });

  it('should display 1 as initial quantity', () => {
    render(<CartItem product={product} />);
    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  fit('should increase quantity by 1 when second button is clicked', async () => {
    render(<CartItem product={product} />);

    const [_, button] = screen.getAllByRole('button');

    await fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it.todo('should decrease quantity by 1 when first button is clicked');

  it.todo('should not to go below zero in the quantity');
});
