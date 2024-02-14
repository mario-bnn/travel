
<script setup lang="ts">
  defineProps<{
      nextStep: (step: string, data: DataInfoUser) => void
      previusStep: () => void
  }>();
    
  const dataUser = ref<DataInfoUser>({
    name: '',
    surname: '',
    age: '',
    phone: '',
    email: '',
    gender: 'Male',
    id: ''
});
</script>

<template>
  <div class="container">
    <FormKit
        id="secondForms"
        type="form"
        #default="{ state: { valid } }"
        :actions="false"
        form-class="row content-form-travel"
        submitLabel="Next"
        validation-visibility="live"
        @submit="nextStep('second', dataUser)"
        :submit-attrs="{
            wrapperClass: 'col-12 content-button-submit',
            inputClass: 'btn btn-primary',
            validationVisibility:'live'
        }"
    >
        <h5 class="message-upload-image">
          Add your information
        </h5>
        <FormKit
            label-class="form-label"
            outer-class="col-md-6"
            input-class="form-control"
            type="text"
            label="Name"
            placeholder="Name"
            name="name"
            id="name"
            v-model="dataUser.name"
            validation="required"
        />
        <FormKit
          label-class="form-label"
          outer-class="col-md-6"
          input-class="form-control"
          type="text"
          label="Surname"
          placeholder="Surname"
          name="surname"
          id="surname"
          v-model="dataUser.surname"
          validation="required"
      />
      <FormKit
        label-class="form-label"
        outer-class="col-md-6"
        input-class="form-control"
        type="number"
        label="Age"
        placeholder="Age"
        name="age"
        id="age"
        :min="18"
        :max="120"
        validation="required|min:18"
        validation-visibility="live"
        :validation-messages="{
          min: 'To book you must be of legal age (18)',
        }"
        v-model="dataUser.age"
      />
      <FormKit
        label-class="form-label"
        outer-class="col-md-6"
        input-class="form-control"
        type="email"
        label="Email"
        placeholder="email@example.com"
        name="email"
        id="email"
        v-model="dataUser.email"
        validation="required|email"
      />
      <FormKit
        label-class="form-label"
        outer-class="col-md-6"
        input-class="form-control"
        type="tel"
        label="Phone number"
        placeholder="123-456-1234"
        name="email"
        id="email"
        v-model="dataUser.phone"
        validation="matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
        :validation-messages="{
          matches: 'Phone number must be in the format xxx-xxx-xxxx',
        }"
      />
      <FormKit
        label-class="form-label"
        outer-class="col-md-6"
        input-class="form-select"
        placeholder="Select a gender"
        type="select"
        label="Gender"
        name="Gender"
        validation="required"
        :options="[
          'Male',
          'Female',
          'Other',
        ]"
      />
      <WizardButtonSubmitForms 
        :label="'Next'"
        :valid="valid" 
        :previus="true"
        @previus-step="previusStep"
      />
    </FormKit>
  </div>
</template>

<style scoped lang="scss">

</style>
