<template>
  <video autoplay="true" ref="video">
  </video>
</template>
<script>
export default {
  mounted () {
    const video = this.$refs.video

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream
        })
        .catch(function (err0r) {
          console.log('Something went wrong!')
        })
    }
  }
}
</script>
<style>
small {
  color:red;
}

</style>
