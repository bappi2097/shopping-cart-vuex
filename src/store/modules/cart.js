import shop from "../../api/shop";
export default {
  namespaced: true,
  state: {
    items: [],
    checkoutStatus: null
  },
  getters: {
    cartProducts(state, getters, rootState, rootGetters) {
      return state.items.map(cartItem => {
        let product = rootState.products.items.find(
          product => cartItem.id == product.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        };
      });
    },
    cartTotal(state, getters) {
      return getters.cartProducts.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
    }
  },
  mutations: {
    pushProductToCart(state, productId) {
      state.items.push({
        id: productId,
        quantity: 1
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state) {
      state.items = [];
    }
  },
  actions: {
    addProdectToCart(
      { state, commit, getters, rootState, rootGetters },
      product
    ) {
      if (rootGetters["products/productIsInStock"](product)) {
        let cartItem = state.items.find(item => item.id == product.id);
        if (!cartItem) {
          commit("pushProductToCart", product.id);
        } else {
          commit("incrementItemQuantity", cartItem);
        }
        commit("products/decrementProductInventory", product, { root: true });
      }
    },
    checkout({ state, commit }) {
      shop.buyProducts(
        state.items,
        () => {
          commit("emptyCart");
          commit("setCheckoutStatus", "success");
        },
        () => {
          commit("setCheckoutStatus", "fail");
        }
      );
    }
  }
};
