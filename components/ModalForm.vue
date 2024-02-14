
<script setup lang="ts">
    defineProps<{
        isEdit: boolean;
        labelModal: string
    }>();
</script>


<template>
  <div class="container-modal">
    <div class="container content-form">
        <div class="modal-header">
            <h1 class="modal-title">
                {{ isEdit ? 'Edit travle' : labelModal }}
            </h1>
            <button 
                type="button"
                @click="toggleModal(), $emit('resetWizard'), $emit('resetForm')"
                class="btn-close" 
                aria-label="Close">
            </button>
        </div>
        <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
    @import '../scss/index.scss';
    .container-modal {
        position: fixed;
        inset: 0;
        transform: translateY(100%);
        transition: transform 0.3s ease-in-out;
        
        &,
        .modal-header {
            background-color: #fff;  
        }

        .content-form {
            position: relative;
            height: 100%;
            padding: rem(32) 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .modal-header {
           width: 100%;
           position: absolute;
           top: 0;
           left: 0;
           z-index: 1;

           .btn-close {
            @include font-size-line-weight(24, 24);
            padding: rem(10);
            margin: rem(-10);
           }
        }

        &.show-modal {
           transform: translateY(0);
        }


    }


</style>
