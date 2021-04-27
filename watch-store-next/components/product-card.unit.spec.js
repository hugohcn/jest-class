import { fireEvent, render, screen } from '@testing-library/react';
import ProductCard from './product-card';

const product = {
  title: 'relógio bonito',
  price: '22.90',
  image:
    'https://images.unsplash.com/photo-1581074652459-2ba81b219e19?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80 750w',
};

const addToCart = jest.fn();

const renderProductCard = () => {
  render(<ProductCard product={product} addToCart={addToCart} />);
};

describe('Product Card Unit Test', () => {
  beforeEach(renderProductCard);

  it('should render ProductCard component', () => {
    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    expect(
      screen.getByText(new RegExp(product.title, 'i')),
    ).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(product.price, 'i')),
    ).toBeInTheDocument();

    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image,
    });
  });

  it('should call props.addToCart when buttons get clicked', async () => {
    const button = screen.getByRole('button');
    await fireEvent.click(button);
    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
