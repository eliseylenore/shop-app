<template>
  <div>
    <h1>Products</h1>
    <router-link :to="{ name: 'Product', params: { id: '1' } }">
      Product 1
    </router-link>
  </div>
</template>
