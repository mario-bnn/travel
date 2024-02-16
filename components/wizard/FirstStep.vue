
<script setup lang="ts">
  const {nextStep} = defineProps<{
      item: Data[];
      nextStep: (step: string, data: DataInfoUser | Data) => void
    }>();
    const route = useRoute();
</script>

<template>
  <ListTravel
    title="Travel list"
    :show-action="false"
    :show-add="true"
    :item="item"
    @data-travel="nextStep"
    class="content-list-travel"
    :is-search="(route.query.name as string)"
  />
</template>

<style scoped lang="scss">
  .content-list-travel {
    width: 100%;
  }
</style>
