
<script setup lang="ts">
    const valueInputSeach = ref<string>('');
    const router = useRouter();
    const route = useRoute()
    const emit = defineEmits(["getData"]);

    const searchSubmit = () => {
        router.push({
            path: route.fullPath,
            query: { 
                name: valueInputSeach.value.toLocaleLowerCase(),
            },
        });
        setTimeout(() => {
            emit('getData');
        });
    }
</script>

<template>
    <div class="contet-form-search row">
        <form @submit.stop.prevent="searchSubmit()" 
                class="col-md-3 offset-md-9 form-search">
            <button class="btn button-search" type="submit">
                <i class="bi bi-search"></i>
            </button>
            <input
                @keyup="searchSubmit"
                class="form-control imput-search"
                type="text" 
                placeholder="Search for city"
                v-model="valueInputSeach"
            >
        </form>
    </div>
</template>

<style scoped lang="scss">
    @import '../scss/index.scss';
    .contet-form-search {
        margin-bottom: rem(32);

        .form-search {
            position: relative;
            .button-search {
                position: absolute;
                right: rem(12);
                top: 0;
            }

        }
    }
</style>
