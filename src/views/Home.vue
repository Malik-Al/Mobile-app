<template>
    <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
        />
        <q-btn style="background: primary; color: white" glossy unelevated icon="camera_enhance"  router-link to="/camera"></q-btn>
      </q-toolbar>
    </q-header>
    <router-view></router-view>
    </q-layout>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  mounted () {
    this.$router.push('/camera')
  }
}

</script>
