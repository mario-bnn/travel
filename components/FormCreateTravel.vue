
<script setup lang="ts">
   const props = defineProps<{
        dataLenght: number;
        singleTravel?: Data;
        isEdit: boolean;
    }>();
   const currentDate = ref();
   const edit = ref<boolean>(false);
   const imgUrl = ref<HTMLImageElement>();

    const formData = ref<Data>({
        id:  '',
        name: '',
        image: '',
        startDate:  '',
        endDate: '',
        description: '',
        price: '',
        reviews: ''
    });

    watch(props, () => {         
        if (props.singleTravel) formData.value = props.singleTravel;
        edit.value = props.isEdit;
    });

    onMounted(() => { 
        if (process.client) {
            const getCurrentDate = new Date();
            getCurrentDate.setTime(getCurrentDate.getTime() + (24 * 60 * 60 * 1000));
            currentDate.value = getCurrentDate.toLocaleDateString('en-us', {year: 'numeric', month: 'numeric', day: 'numeric' });
        }
    });
</script>

<template>
    <FormKit
        id="form-travel"
        type="form"
        form-class="row content-form-travel"
        :submitLabel="edit ? 'Save' : 'Create'"
        #default="{ state: { valid } }"
        @submit="$emit('submitForm')"
        :submit-attrs="{
            wrapperClass: 'col-12 content-button-submit',
            inputClass: 'btn btn-primary',
        }"
    >
        <div class="content-input-image row">
            <FormKit
                label-class="form-label"
                outer-class="form-label col-md-6"
                input-class="form-control"
                type="text"
                label="Add url for image"
                placeholder="Enter url for image..."
                name="image"
                id="image"
                validation="required"
                ref="imgUrl"
                v-model="formData.image"
            />
        </div>
        <h5 class="message-upload-image">
           Travel information
        </h5>
        <FormKit
            label-class="form-label"
            outer-class="col-md-6"
            input-class="form-control"
            type="text"
            label="Journey title"
            placeholder="Journey title"
            name="journeyTitle"
            id="firstName"
            v-model="formData.name"
            validation="required"
        />
        <FormKit
            label-class="form-label"
            type="textarea"
            outer-class="col-md-6"
            name="description"
            input-class="form-control description-travel"
            label="Travel description"
            placeholder="Travel description"
            validation="length:0,200"
            validation-visibility="live"
            :help="`${formData.description ? formData.description.length : 0} / 200`"
            rows="6"
            v-model="formData.description"
            :validation-messages="{
                length: 'Instructions cannot be more than 200 characters.',
            }"
        />
        <FormKit
            label-class="form-label"
            type="date"
            input-class="form-control"
            outer-class="col-md-6"
            value="01-01-1990"
            label="date start travel"
            id="startDate"
            help="Select a date from tomorrow"
            v-model="formData.startDate"
            :validation="`required|date_after:${currentDate}`"
        />
        <FormKit
            label-class="form-label"
            type="date"
            input-class="form-control"
            outer-class="col-md-6"
            value="01-01-1990"
            label="return date of the journey"
            help="Select a date from date start travel"
            id="endDate"
            v-model="formData.endDate"
            :validation="`required|date_after:${formData.startDate}`"
        />
        <FormKit
            label-class="form-label"
            type="number"
            input-class="form-control"
            outer-class="col-md-6"
            label="Enter the price"
            placeholder="€"
            name="price"
            step="1"
            min="1"
            v-model="formData.price"
            validation="required"
        />
        <FormKit
            label-class="form-label"
            type="number"
            placeholder="max 5"
            outer-class="col-md-6"
            input-class="form-control"
            label="Enter the reviews"
            name="price"
            step="1"
            max="5"
            min="1"
            v-model="formData.reviews"
            validation="required"
        />
    </FormKit>
</template>

<style scoped lang="scss">
    @import '../scss/index.scss';

    .formkit-form {
        padding: rem(80) rem(20) rem(20);
        overflow-y: auto;

        .content-input-image {
            border-bottom: rem(1) solid #b5b7b9;
            margin: rem(40) 0;
    
            .formkit-outer {
               margin: rem(20) 0;
            }

            .wrapper-drag-file {
                border-radius: rem(20);
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .content-input {
                    :deep(.formkit-messages) {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                    }

                    :deep(.formkit-inner) {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        .formkit-no-files {
                            display: none;
                        }

                        .formkit-input {
                            width: auto;
                        }
    
                        .formkit-file-list {
                            padding: 0;
                            list-style: none;
                            margin: 0;
    
    
                            .formkit-file-name {
                                display: none;
                            }
                        }
    
                        .formkit-file-remove {
                            font-size: 0;
                            padding: 0;
    
                            .formkit-file-remove-icon {
                                svg {
                                    width: rem(40);
                                    height: rem(40);
                                }
                            }
                        }
                    }

                    .description-upload-image {
                        @include font-size-line-weight(14, 18, 700);
                        text-align: center;
                        margin-bottom: rem(32);
                    }
        
                }

                .image-drag {
                    object-fit: contain;
                    width: rem(150);
                    height: rem(150);

                    &.show-image {
                        display: inline;
                        opacity: 1;
                        visibility: visible;
                    }
                }
            }
        }
    }
</style>
