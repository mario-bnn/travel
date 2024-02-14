
<script setup lang="ts">
  const {nextStep} = defineProps<{
      item: Data[];
      nextStep: (step: string, data: DataInfoUser | Data) => void
    }>();
</script>

<template>
  <ListTravel
    v-if="item?.length"
    title="Travel list"
    :show-action="false"
    :show-add="true"
    :item="item"
    @data-travel="nextStep"
    class="content-list-travel"
  />
</template>

<style scoped lang="scss">
  .content-list-travel {
    width: 100%;
  }
</style>
