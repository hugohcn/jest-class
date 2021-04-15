import Cart from './cart';
import Discount from './discount-utils';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'Adidas Running Boost FX1000',
    price: 35388,
  };

  let product2 = {
    title: 'Adidas Running Boost FX1000 - Women',
    price: 41872,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created insctance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount ', () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.addItem(item);

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should ensure no more than one product exists at a time', () => {
      const item = {
        product,
        quantity: 2,
      };

      cart.addItem(item);
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should ensure no more than one product exists at a time', () => {
      const item = {
        product,
        quantity: 2,
      };

      const item2 = {
        product,
        quantity: 2,
      };

      cart.addItem(item);
      cart.addItem(item2);
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should update total when a product gets included then removed', () => {
      const item1 = {
        product,
        quantity: 2,
      };

      const item2 = {
        product: product2,
        quantity: 1,
      };

      cart.addItem(item1);
      cart.addItem(item2);

      cart.removeItem(product);

      expect(cart.getTotal().getAmount()).toEqual(41872);
    });
  });

  describe('checkOut()', () => {
    it('should return an object with the total and the list of items', () => {
      const item1 = {
        product,
        quantity: 2,
      };

      const item2 = {
        product: product2,
        quantity: 3,
      };

      cart.addItem(item1);
      cart.addItem(item2);

      expect(cart.checkOut()).toMatchSnapshot();
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      const item1 = {
        product,
        quantity: 5,
      };

      const item2 = {
        product: product2,
        quantity: 3,
      };

      cart.addItem(item1);
      cart.addItem(item2);

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('should include formmated amount in the summary ', () => {
      const item1 = {
        product,
        quantity: 5,
      };

      const item2 = {
        product: product2,
        quantity: 3,
      };

      cart.addItem(item1);
      cart.addItem(item2);

      expect(cart.summary().formmated).toEqual('R$3,025.56');
    });

    it('should reset the cart when checkout() is called', () => {
      const item2 = {
        product: product2,
        quantity: 3,
      };
      cart.addItem(item2);
      cart.checkOut();
      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('discounts', () => {
    it('should apply percentage discount above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      const item = {
        product: product,
        condition,
        quantity: 3,
      };

      cart.addItem(item);
      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it('should apply quantity discount for even product quantities', () => {
      const condition = {
        quantity: 2,
      };

      const item = {
        product: product,
        condition,
        quantity: 4,
      };

      cart.addItem(item);
      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      };

      const item = {
        product: product,
        condition,
        quantity: 5,
      };

      cart.addItem(item);
      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should return discount equals zero when item receives percentages discount and the minimum is null or undefined', () => {
      const condition = {
        percentage: 30,
      };

      const item = {
        product: product,
        condition,
        quantity: 3,
      };

      cart.addItem(item);
      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should NOT return discount when the quantity is lesser than the minimum item quantity', () => {
      const condition = {
        quantity: 2,
      };

      const item = {
        product: product,
        condition,
        quantity: 1,
      };

      cart.addItem(item);
      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should receive two or more conditions and determine/apply the best discount. First case.', () => {
      const condition1 = {
        percentage: 30,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2,
      };

      cart.addItem({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should receive two or more conditions and determine/apply the best discount. Second case.', () => {
      const condition1 = {
        percentage: 80,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2,
      };

      cart.addItem({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });
  });
});
