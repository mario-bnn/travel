<script setup lang="ts">
      defineProps<{
        labelButton: string;
    }>();
</script>


<template>
    <div class="container container-travel-list">
        <div class="row">
          <div class="col-12">
            <button 
              type="button" 
              class="btn btn-success button-new-travel" 
              @click="toggleModal()"
            >
            {{ labelButton }}
            </button>
            <slot></slot>
          </div>
        </div>
      </div>
</template>

<style setup lang="scss">
.container-travel-list {
    margin-top: 32px;
    .button-new-travel {
      margin-bottom: 32px;
    }
  }
</style>