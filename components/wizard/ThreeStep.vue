
<script setup lang="ts">
  defineProps<{
      nextStep: (step: string, data?: DataThreeSteps) => void
      previusStep: () => void
  }>();

 const typePayment = ref<DataThreeSteps>({payment: '', notes: ''});
</script>

<template>
  <div class="container content-form-payment">
    <FormKit
        id="lastForms"
        type="form"
        #default="{ state: { valid } }"
        :actions="false"
        form-class="row content-form-travel"
        submitLabel="Next"
        validation-visibility="live"
        @submit="nextStep('last', typePayment)"
        :submit-attrs="{
            wrapperClass: 'col-12 content-button-submit',
            inputClass: 'btn btn-primary',
            validationVisibility:'live'
        }"
    >
    <FormKit
      v-model="(typePayment.payment as string)"
      type="radio"
      label="Select type of payment"
      outer-class="col-md-5"
      label-class="form-check-label label-radio"
      input-class="form-check-input input-radio"
      :options="['Credit transfer', 'Paypal', 'Revolut']"
    />
    <div
      class="content-input-payment col-md-6 offset-md-1 row"
      :class="{'show-payment': typePayment.payment === 'Credit transfer'}"
    >
      <FormKit
        label-class="form-label"
        outer-class="col-md-6"
        input-class="form-control"
        type="number"
        label="Card Number"
        placeholder="Card Number"
        name="cardNumber"
        id="cardNumber"
        :min="1"
        :validation="typePayment.payment === 'Credit transfer' ? 'required' : ''"
      />
      <FormKit
        label-class="form-label"
        outer-class="col-md-6"
        input-class="form-control"
        type="text"
        label="Full name"
        placeholder="Full name"
        name="fullName"
        id="fullVame"
        :validation="typePayment.payment === 'Credit transfer' ? 'required' : ''"
      />
      <FormKit
        label-class="form-label"
        type="date"
        input-class="form-control"
        outer-class="col-md-6"
        value="01-01-1990"
        label="Expiry date"
        id="expiryDate"
        :validation="typePayment.payment === 'Credit transfer' ? 'required' : ''"
      />
      <FormKit
        label-class="form-label"
        outer-class="col-md-6"
        input-class="form-control"
        type="number"
        label="Card Number"
        length="3"
        maxLength="3"
        placeholder="123"
        name="cardNumber"
        id="cardNumber"
        :min="1"
        :validation="typePayment.payment === 'Credit transfer' ? 'required|length:3' : ''"
        :validation-messages="{
          length: 'Cannot be more than 3 characters',
        }"
      />
    </div>
    <FormKit
      label-class="form-label"
      type="textarea"
      outer-class="col-md-6"
      name="notes"
      input-class="form-control description-travel"
      label="Personal notes"
      placeholder="Travel description"
      validation="length:0,200"
      validation-visibility="live"
      :help="`${typePayment.notes ? typePayment.notes.length : 0} / 200`"
      rows="6"
      v-model="typePayment.notes"
      :validation-messages="{
          length: 'Instructions cannot be more than 200 characters.',
      }"
    />
      <WizardButtonSubmitForms 
        :valid="valid"
        :label="'Confirm'"
        :previus="true"
        @previus-step="previusStep"
      />
    </FormKit>
  </div>
</template>

<style scoped lang="scss">
  @import '../../scss/index.scss';

  .content-form-payment {
    .content-input-payment {
      opacity: 0;
      transition: all 0.3s ease-in-out;
      &.show-payment {
        opacity: 1;
        visibility: visible;
      }
    }

    :deep(.formkit-outer) {

      .formkit-legend {
        margin-bottom: rem(24);
      }
      
      .formkit-options {
        list-style: none;
        padding: 0;
  
        .formkit-option {
          &:not(:last-child) {
            margin-bottom: rem(16);
          }
        }
    
        .formkit-input  {
          width: rem(16);
          margin-right: rem(8);
        }
      }
    }
  }
</style>
