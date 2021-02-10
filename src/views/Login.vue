<template>
  <div class="q-pa-md" style="max-width: 300px; margin: 0 auto; ">
    <form @submit.prevent="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
      <q-input
        ref="email"
        filled type="text"
        v-model="email"
        label="Your email "
        hint="email"
        :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
      />
      <small
      class="helper-text invalid"
      v-if="$v.email.$dirty && !$v.email.required"
      >Поле Email не должно быть пустым</small>
      <small
      class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.email"
      >Введите корректый Email</small>

      <q-input
        ref="password"
        filled type="password"
        v-model="password"
        label="password "
        hint="Password"
        :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }"
      />

      <small
      class="helper-text invalid"
      v-if="$v.password.$dirty && !$v.password.required"
      >Введите пароль</small>
      <small
      class="helper-text invalid"
      v-else-if="$v.password.$dirty && !$v.password.minLength"
      >Пароль должен быть {{$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}</small>

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
      <q-btn color="secondary" router-link to="/register"> Зарегистрироваться</q-btn>
    </form>
  </div>
</template>
<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: null,
      password: null,
      accept: false
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    accept: { checked: v => v }
  },

  methods: {
    onSubmit () {
      this.submitHandler()
      // console.log((this.$v.$invalid))
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Сначала вам необходимо принять лицензию и условия'
        })
      }
    },
    submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        // eslint-disable-next-line no-useless-return
        return
      } this.$router.push('/')
    },
    onReset () {
      this.email = null
      this.password = null

      this.$refs.email.resetValidation()
      this.$refs.password.resetValidation()
    }
  }
}
</script>
<style>
small {
  color:red;
}

</style>
