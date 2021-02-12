<template>
<div class="container" id="videoElement">
  <video autoplay="true" ref="video">
  </video>

    <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px" >
                  <q-input dark type="text" v-model="input" label="Name"></q-input>
             <div id="enter-send">
                  <q-btn @click="getPicture" color="secondary" label="Send" no-caps/>
                  <q-btn @click="startTimer" color="secondary" label="Start" no-caps/>
             </div>
       </div>
    </div>

    <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px" >
           <canvas ref="canvas"></canvas>
        </div>
    </div>

</div>
</template>
<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    input: ''
  }),
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
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  methods: {
    ...mapActions({ saveId: 'save_id' }),
    startTimer () {
      axios({
        method: 'post',
        url: 'http://82.148.18.248:3000/timer',
        data: {
          userId: this.id
        }
      }).then((res) => {
        console.log(res.data)
      })
    },
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
      // TODO userId
      axios({
        method: 'post',
        url: 'http://82.148.18.248:3000/user',
        data: {
          username: this.input,
          face: 'Flintstone'
        }
      }).then((res) => {
        console.log(res.data)
        this.saveId(res.data._id ? res.data._id : res.data)
      })
      console.log(this)

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
#enter-send{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.face-id{
  display: flex;
  flex-direction: row;
  justify-content:center;
}
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
