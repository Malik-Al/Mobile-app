<template>
<div class="container" id="videoElement">
  <video autoplay="true" ref="video">
  </video>
  <q-btn v-on:click="getPicture" color="secondary" label="Yellow ripple" no-caps/>
  <canvas ref="canvas"></canvas>
</div>
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
  },
  methods: {
    getPicture () {
      this.getLocation()
      const canvas = this.$refs.canvas
      const video = this.$refs.video

      const img = new Promise((resolve) => {
        const ctx = canvas.getContext('2d')
        const w = video.videoWidth
        const h = video.videoHeight
        canvas.width = w
        canvas.height = h

        ctx.drawImage(video, 0, 0, w, h)
        ctx.font = '16px Arial'
        ctx.fillText((new Date()).toString(), 0, 20)

        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/jpeg')
      })

      console.log(img)
    },
    getLocation () {
      this.$getLocation()
        .then(coordinates => {
          console.log(coordinates)
        })
    }
  }
}
</script>
<style>
small {
  color:red;
}
.container {
  margin: 0px auto;
}
#videoElement {
  background-color: #666;
}

video{
  width: 100%;
  height: 600px;
}
canvas{
  margin-left: 18%;
}

</style>
