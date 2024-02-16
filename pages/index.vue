<script setup lang="ts">
  const item = ref<Data[]>([]);
  const isEdit = ref<boolean>(false);
  const getId = ref<number | null>(null);
  const route = useRoute();
  const getIdDelete = ref<string>('');
  const singleTravel = ref<Data>();
  const pathImage = '../public/image.jpg';

  const getData = async (id?: number) => {
    const res: DataTravel = await $fetch(`http://localhost:8000/listTravel${route.query.name ?'?name_like='+ route.query.name : ''}`);
     item.value = res as unknown as Data[];
  }

  const getDataEdit = (data: Data) => {
    singleTravel.value = data;
    getId.value = data.id as unknown as number;
    isEdit.value = true;
  }

  const deleteItem = async (id: number) => {  
      await $fetch(`http://localhost:8000/listTravel/${id}`, {
          method: 'DELETE', 
      });
      getData();
  }

  const shoModaleDelete = (id: string) => {
    getIdDelete.value = id;
  } 

  const resetFormCloseModal = () => {
    const node = getNode('form-travel');
    node?.reset();
    getId.value = null;
    isEdit.value = false;
    getData();
  }

  watch(() => route.query.name, () => {
      getData();
    }
  )

  const submitForm = async (data: Data) => {
      try {
        const response: Data = await $fetch(`http://localhost:8000/listTravel${ getId.value ? '/' + getId.value : ''}`, {
          method: getId.value ? 'PUT' : 'POST',
          body: {
              id: (getId.value || String(item.value && Math.floor(Math.random() * Date.now()))) || 0,
              name: data.name,
              image: data.image || pathImage,
              description: data.description,
              price: data.price,
              startDate: data.startDate,
              endDate: data.endDate,
              reviews: data.reviews,
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
        title="Travel list"
        :show-add="false"
        :show-action="true"
        :edit="isEdit"
        @sho-modale-delete="shoModaleDelete"
        @toggle-modal="toggleModal"
        :item="item"
        @edit-travel="getDataEdit"
        :is-search="(route.query.name as string)"
      />
      <ModalForm
        :is-edit="isEdit"
        :label-modal="'New Travel'"
        @toggle-modal="toggleModal"
        @reset-form="resetFormCloseModal"
      >
      <FormCreateTravel
        @toggle-modal="toggleModal"
        :data-lenght="item?.length || 0"
        @submit-form="submitForm"
        :single-travel="singleTravel"
        :is-edit="isEdit"
    />
  </ModalForm>
  <ConfirmModal
    :id-item-delete="getIdDelete"
    @delete-item="deleteItem"
  />
</RenderInfoPage>
</template>

<style setup lang="scss">
  .container-travel-list {
  }
</style>