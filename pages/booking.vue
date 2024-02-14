<script setup lang="ts">
  import type { LocationQueryValue } from 'vue-router';
  import FirstStep from '../components/wizard/FirstStep.vue';
  import SecondStep from '../components/wizard/SecondStep.vue';
  import ThreeStep from '../components/wizard/ThreeStep.vue';
  const itemBooking = ref<Data[]>([]);
  const itemTravel = ref<Data[]>([]);
  const route = useRoute();
  const getParams = ref<LocationQueryValue | LocationQueryValue[]>(route.query.name);
  const getInfobooking = ref<Data>()
  const getInfoForm = ref<DataInfoUser>();
  const stepForm = ref(0);
  const dataPayment = ref<string>('');

  const components = [
    FirstStep,
    SecondStep,
    ThreeStep
  ]

  const getDataBooking = async () => {
    const res: DataInfoUser[] = await $fetch(`http://localhost:8000/dataBooking`);
    itemBooking.value = res.map(item => item.travel) as unknown as Data[];
  }

  const getDataTavel = async () => {
    const res: DataTravel = await $fetch(`http://localhost:8000/listTravel${getParams.value ? '?name_like='+ getParams.value : ''}`);
    itemTravel.value = res as unknown as Data[];
  }
  
  const resetWizard = () => {
    const secondForms = getNode('secondForms');
    const lastForms = getNode('lastForms');
    if (secondForms) secondForms.reset();
    if (lastForms) lastForms.reset();  
    stepForm.value = 0;
  }

  const nextStep = (step: string, data?: DataInfoUser | Data | string) => {
    if (data && step === 'first') {
      getInfobooking.value = data as Data;
    }

    if (data && step === 'second') {
      getInfoForm.value = data as DataInfoUser;
    }

    if (step === 'last') {
      dataPayment.value = data as string;
      submitFormBooking();
      return
    }

    if (stepForm.value + 1 < components.length) {
      stepForm.value++;
    }
}

  const previusStep = () => {   
    if (stepForm.value > 0) {
        stepForm.value--;
    }
  }

  watchEffect(() => {
      getParams.value = route.query.name;
  });

  onMounted(() => {
    if(process.client) {
      getDataBooking();
      getDataTavel();
    }
  });

  const submitFormBooking = async () => {
      try {
        const response: DataInfoUser = await $fetch(`http://localhost:8000/dataBooking`, {
          method: 'POST',
          body: {
            travel: {
              id: getInfobooking.value?.id,
              name: getInfobooking.value?.name.toLocaleLowerCase(),
              image: getInfobooking.value?.image,
              description: getInfobooking.value?.description,
              price: getInfobooking.value?.price,
              startDate: getInfobooking.value?.startDate,
              endtDate: getInfobooking.value?.endDate,
              reviews: getInfobooking.value?.reviews,
              payment: dataPayment.value
            },
            id: Math.floor(Math.random() * Date.now()),
            name: getInfoForm.value?.name,
            surname: getInfoForm.value?.surname,
            age: getInfoForm.value?.age,
            phone: getInfoForm.value?.phone,
            email: getInfoForm.value?.email,
            gender: getInfoForm.value?.gender,
          }
        });

        if (response) {
            stepForm.value++;
          /***********************************************************
           * Timeout has been set to 600ms for progress bar animation
          ************************************************************/
          setTimeout(() => {
            toggleModal();
            resetWizard();
          }, 600);
          getDataBooking();
        }

      } catch (error: Error | unknown) {
          console.log(error);
      }
  }
</script>

<template>
  <RenderInfoPage
    label-button="Create a new booking">
      <ListTravel
        :item="itemBooking"
        title="Booking list"
        :show-add="false"
        :show-action="false"
        :list-booking="true"
      />
      <ModalForm
        :is-edit="false"
        :label-modal="'New booking'"
        @toggle-modal="toggleModal"
        @reset-wizard="resetWizard">
        <div class="wrapper-modal-booking">
          <WizardBarStepper
            class="content-progress-step"
           :progress-step="stepForm + 1"/>
          <div class="content-forms-booking">
            <InputSearch 
              class="input-search-booking"
              @get-data="getDataTavel"
              v-if="stepForm === 0"/>
            <KeepAlive>
              <component
                :next-step="nextStep"
                :previus-step="previusStep"
                :item="itemTravel"
                :is="components[stepForm]"
              />
            </KeepAlive>
          </div>
        </div>
  </ModalForm>
  </RenderInfoPage>
  </template>
  
  <style lang="scss">
  @import '../scss/index.scss';

  .wrapper-modal-booking {
    width: 100%;
    height: calc(100% - rem(200));

    &,
    .content-forms-booking {
      display: flex;
      flex-direction: column;
    }

    .content-forms-booking {
      flex: 1;
      justify-content: center;
    }

    .input-search-booking {
      width: 100%;
      margin-bottom: rem(40);
    }
  }

  
  </style>
  