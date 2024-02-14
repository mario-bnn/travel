
<script setup lang="ts">
 const {max, current} = defineProps<{
        max: number;
        current: number
    }>();
</script>

<template>
  <div class="star-rating">
    <span v-for="n in max">&star;</span>
    <div class="star-rating__current" :style="{width: ( current / max ) * 100 + '%'}">
      <span v-for="n in max">&starf;</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
    @import '../scss/index.scss';
    .star-rating {
        color: gold;
        display: inline-block;
        @include font-size-line-weight(24, 24);
        position: relative;
        transform: translate(-6px);
        
        .star-rating__max,
        .star-rating__current {
          position: absolute;
          top: 0;
        }
        
        .star-rating__current {
          overflow: hidden;
          white-space: nowrap;
        }
      }
      
</style>
