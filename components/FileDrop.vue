<script setup lang="ts">
    const events = ["dragenter", "dragleave", "dragover", "drop"];
    const entering = ref<boolean>(false);
    const isNotEmpty = ref<boolean>(false);
    const emit = defineEmits(["resetImage", "upload"]);
    const props = defineProps<{
        inpuValue: string;
    }>();
   const getValue = ref<string>('');

    const handleDrop = (e : DragEvent): void => {
        const files = e.dataTransfer?.files as FileList;
        emit("upload", [...files]);
        if (files.length > 0) isNotEmpty.value = true;
    }

    const handleInput = (e : InputEvent | any): void => {
        const files = (e.target as HTMLInputElement).files as FileList;
        emit("upload", [...files]);
        if (files.length > 0) isNotEmpty.value = true;        
    }

    const resetInput = () => {
        isNotEmpty.value = false;
        const getInput = document.getElementById('inputFileToLoad') as HTMLInputElement;
        if (getInput) getInput.value = '';    
    }

    onMounted(()=>{
        events.forEach( event => 
            document.body.addEventListener(event, (e) => 
            e.preventDefault()
        ))
    })

    onUnmounted(()=>{
        events.forEach(event => 
            document.body.removeEventListener(event, (e) => 
            e.preventDefault()
        ))
    })
</script>

<template>
    <div class="content">
        <button 
                v-if="isNotEmpty"
                @click="$emit('resetImage'), resetInput()"
                class="btn btn-light button-reset-image"
            >
           X
        </button>
        <label
            v-bind="$attrs" 
            class="label"
            @drop.prevent="handleDrop" 
            @dragenter="entering = true" 
            @dragleave="entering = false">
            <input  
                type="file"
                class="input"
                id="inputFileToLoad"
                accept="image/png, image/jpeg" 
                @input="handleInput"
                name="input"
            >
            <span v-if="!isNotEmpty" class="message">Drag your file here, only PNG or JPG are allowed</span>
        </label>
    </div>
</template>

<style scoped lang="scss">
    @import '../scss/index.scss';

    .label {
        .input {
            opacity: 0;
            position: absolute;
            visibility: hidden;
        }
    
        .message {
            padding: 0 rem(24);
            text-align: center;
            display: inline-block;
        }

    }
    .button-reset-image {
        position: absolute;
        top: 50%;
        right: -20%;
        font-size: rem(24);
        line-height: rem(24);
    }

</style>