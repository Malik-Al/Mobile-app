<template>
    <div class="q-pa-md q-gutter-sm" @click="persistent = true">
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">username:{{username}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          start time:{{timerstart && timerstart.substr(11,5) }}
          <br>
          end time:
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      persistent: false
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'timerstart'
    ])
  },
  methods: {
    ...mapActions({
      userName: 'save_username',
      save_timerstart: 'save_timerstart'
    })
  }
}
</script>
