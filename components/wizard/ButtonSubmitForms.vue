
<script setup lang="ts">
    defineProps<{
        valid: boolean,
        previus?: boolean;
        label: string;
    }>();
</script>

<template>
   <div class="content-button">
    <FormKit
        @click="$emit('previusStep')"
        type="button"
        label="Back"
        input-class="btn btn-secondary"
        v-if="previus"
    />
    <FormKit type="submit" 
        :disabled="!valid"  :label="label"
        input-class="btn btn-primary"
    />
  </div>
</template>

<style scoped lang="scss">
    .content-button {
        display: flex;
        justify-content: space-between;

        :deep(.formkit-outer) {
            margin-bottom: 0;
        }

    }
</style>
