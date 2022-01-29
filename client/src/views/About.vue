<template>
  <div class="about">
    <b-container>
      <header>
        <picture>
          <source
            srcset="/img/about-header-large.png"
            media="(min-width: 992px)"
          />
          <source
            srcset="/img/about-header-medium.png"
            media="(min-width: 768px)"
          />
          <img src="/img/about-header-small.png" alt="About us" class="w-100" />
        </picture>
      </header>
      <div class="p-4 bg-turquoise">
        <div class="pr-lg-5">
          <h2 class="text-left white">The shop-app mission</h2>
          <p>
            We strive to help our customers live out their adventures.
          </p>
          <p>
            These can range from the everyday to special vacation gear, from the
            beach to the mountains.
          </p>
          <h2 class="text-left white">
            How it started
          </h2>
          <p>
            In 2020, shop-app's founder saw a need opening for quality retail
            gear for the everyday person. Due to the pandemic, everyone wanted
            to get out and enjoy the outdoors, and there was a market that
            merged between outdoor gear and personal apparel. We've been going
            strong ever since then.
          </p>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.bg-turquoise {
  background-color: $turquoise-dark;
  color: white;
}
.bg-black {
  background-color: black;
}
</style>
