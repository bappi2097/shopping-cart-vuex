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
        {{ product.title }}-{{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import shop from "../api/shop";
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    products() {
      return this.$store.getters.availableProducts;
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch("fetchProducts").then(() => (this.loading = false));
  }
};
</script>

<style scoped></style>
