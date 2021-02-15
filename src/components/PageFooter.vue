<template>
  <footer class="w-100 py-4">
    <b-container>
      <b-row>
        <b-col
          class="d-md-flex align-items-center justify-content-center d-none offset-md-2"
          xs=""
          md="2"
        >
          <img src="/img/cart-dark.png" alt="" style="height: 3em;" />
        </b-col>
        <b-col xs="12" md="2">
          <p class="mb-0"><strong>Account</strong></p>
          <ul class="mb-0">
            <li>
              <a href="#">Manage your account</a>
            </li>
            <li>
              <a href="#">Saved items</a>
            </li>
          </ul>
        </b-col>
        <b-col xs="12" md="2" class="mt-3 mt-md-0">
          <p class="mb-0"><strong>Need help?</strong></p>
          <ul class="mb-0">
            <li>
              <a href="#">Contact and FAQ</a>
            </li>
          </ul>
        </b-col>
        <b-col xs="12" md="2" class="mt-3 mt-md-0">
          <p class="mb-0"><strong>Company</strong></p>
          <ul class="mb-0">
            <li>
              <router-link :to="{ name: 'About' }" class="nav-item"
                >About</router-link
              >
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank">Instagram</a>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<style lang="scss" scoped>
p,
a {
  color: $midnightBlue;
}
ul {
  padding-inline-start: 0;
  list-style: none;
}
footer {
  background-color: $silver;
}
</style>
