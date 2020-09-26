<template>
  <div>
    <h1>Product List</h1>
    <img
      src="https://i.imgur.com/ojv5sZ3.gif"
      alt="loading..."
      v-if="loading == true"
    />
    <ul v-else>
      <li v-for="product of products">
        {{ product.title }} - {{ product.price | currency }} -
        {{ product.inventory }}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProdectToCart(product)"
        >
          Add To Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState("products", {
      products: (state) => state.items,
    }),
    ...mapGetters("products", {
      productIsInStock: "productIsInStock",
    }),
  },
  created() {
    this.loading = true;
    this.fetchProducts().then(() => (this.loading = false));
  },
  methods: {
    ...mapActions("products", {
      fetchProducts: "fetchProducts",
    }),
    ...mapActions("cart", {
      addProdectToCart: "addProdectToCart",
    }),
  },
};
</script>

<style scoped></style>
