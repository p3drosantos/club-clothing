import CartProduct from "../../../types/cart.types";
import CartActionTypes from "./cart.action-types";

interface InitialState {
  isOpen: boolean;
  products: CartProduct[];
}

const initialState: InitialState = {
  isOpen: false,
  products: [],
};

const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CartActionTypes.toggleCart:
      return { ...state, isOpen: !state.isOpen };

    case CartActionTypes.addProductToCart: {
      const product = action.payload;

      // verificar se o produto já está no carrinho
      const productIsAlreadyInCart = state.products.some(
        (item) => item.id === product.id
      );

      // se sim -> aumentar sua quantidade
      if (productIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // se não -> adicioná-lo
      return {
        ...state,
        products: [...state.products, { ...product, quantity: 1 }],
      };
    }

    case CartActionTypes.removeProductFromCart: {
      const productId = action.payload;

      return {
        ...state,
        products: state.products.filter((item) => item.id !== productId),
      };
    }

    case CartActionTypes.increaseCartProductQuantity: {
      const productId = action.payload;

      return {
        ...state,
        products: state.products.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case CartActionTypes.decreaseCartProductQuantity: {
      const productId = action.payload;

      return {
        ...state,
        products: state.products
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case CartActionTypes.clearCartProducts:
      return { ...state, products: [] };

    default:
      return state;
  }
};

export default cartReducer;
