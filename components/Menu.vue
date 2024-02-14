
<script setup lang="ts">


</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container-fluid">
        <nuxt-link 
          class="navbar-brand"
          to="/">Travel
        </nuxt-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <nuxt-link 
                class="nav-link" to="/">
                Travel list
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
                class="nav-link"
                to="/booking">Booking
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">

</style>
