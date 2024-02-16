<script setup lang="ts">
  import type { LocationQueryValue } from 'vue-router';
  const item = ref<Data[]>([]);
  const isEdit = ref<boolean>(false);
  const getId = ref<number | null>(null);
  const route = useRoute();
  const getParams = ref<LocationQueryValue | LocationQueryValue[]>(route.query.name);
  
  const formData = ref<Data>({
        id:  '',
        name:  '',
        image:  '',
        startDate:  '',
        endDate: '',
        description: '',
        price: '',
        reviews: ''
    });

  watchEffect(() => {
    getParams.value = route.query.name;
  });

  const pathImage = '../public/image.jpg';

  const getData = async (id?: number) => {
    const res: DataTravel = await $fetch(`http://localhost:8000/listTravel${getParams.value ?'?name_like='+ getParams.value : ''}`);
     item.value = res as unknown as Data[];
  }

  const getDataEdit = (data: Data) => {
    formData.value = data;
    getId.value = data.id as unknown as number;
    isEdit.value = true;
  }

  const deleteItem = async (id: number) => {   
      await $fetch(`http://localhost:8000/listTravel/${id}`, {
          method: 'DELETE', 
      });
      getData();
  }

  const resetFormCloseModal = () => {
    const node = getNode('form-travel');
    node?.reset();
    isEdit.value = false;
    getData();
  }

  const submitForm = async () => {
      try {
        const response: Data = await $fetch(`http://localhost:8000/listTravel${ getId.value ? '/' + getId.value : ''}`, {
          method: getId.value ? 'PUT' : 'POST',
          body: {
              id: (getId.value || String(item.value && Math.floor(Math.random() * Date.now()))) || 0,
              name: formData.value.name.toLocaleLowerCase(),
              image: formData.value.image || pathImage,
              description: formData.value.description,
              price: formData.value.price,
              startDate: formData.value.startDate,
              endDate: formData.value.endDate,
              reviews: formData.value.reviews,
          }
        });

        if (response) {
            if (getId.value) isEdit.value = false;
            getData();
            toggleModal();
            resetFormCloseModal();
        }

      } catch (error: Error | unknown) {
          console.log(error);
      }
  }

  onMounted(() => {
    if(process.client) {
      getData();
    }
  });
</script>

<template>
  <RenderInfoPage
      label-button="Create a new travel">
      <InputSearch @get-data="getData"/>
      <ListTravel 
        v-if="item?.length"
        title="Travel list"
        :show-add="false"
        :show-action="true"
        :edit="isEdit"
        @delete-item="deleteItem"
        @toggle-modal="toggleModal"
        :item="item"
        @get-data-edit="getDataEdit"
      />
      <ModalForm
        :is-edit="isEdit"
        :label-modal="'New Travel'"
        @toggle-modal="toggleModal"
        @reset-form="resetFormCloseModal"
      >
      <FormCreateTravel
        @get-data="getData"
        @toggle-modal="toggleModal"
        :data-lenght="item?.length || 0"
        @submit-form="submitForm"
        :single-travel="formData"
        :is-edit="isEdit"
    />
  </ModalForm>
</RenderInfoPage>
</template>

<style setup lang="scss">
  .container-travel-list {
  }
</style>