<template>
<div class="container" id="videoElement">
  <video autoplay="true" ref="video">
  </video>

    <div id="register-scrin">
        <div class="q-gutter-md" style="max-width: 300px" >
                <q-input dark type="text" v-model="input" label="Name"></q-input>
             <div id="enter-send">
                <q-btn @click="getPicture" color="secondary" label="Send " no-caps/>
                <q-btn @click="playVid" color="secondary" label="Reset" no-caps/>
             </div>
                <div class="q-pa-md q-gutter-sm">
                  <q-btn  @click="sendImg" color="primary" label="Start" style="width: 200px"></q-btn>
                </div>
          </div>
        </div>
    <div class="submenu">
       <canvas ref="canvas"></canvas>
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
      'id',
      'username',
      'timerstart'
    ])
  },
  methods: {
    ...mapActions({
      saveId: 'save_id',
      userName: 'save_username',
      save_timerstart: 'save_timerstart'
    }),
    startTimer () {
      axios({
        method: 'post',
        url: 'http://discoverykg.ddns.net:9292/timer',
        data: {
          userId: this.id
        }
      }).then((res) => {
        console.log(res.data)
        this.save_timerstart(res.data.start)
      })
    },
    async getPicture () {
      this.getLocation()
      this.pauseVid()
      const canvas = this.$refs.canvas
      const video = this.$refs.video
      return new Promise((resolve) => {
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
    },
    async sendImg () {
      const imgSend = await this.getPicture()
      const formData = new FormData()
      formData.append('image', new File([imgSend], 'image.jpg'))
      formData.append('username', this.input)
      this.$q.loading.show()
      await axios({
        method: 'post',
        url: 'http://discoverykg.ddns.net:9292/user',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log(res.data)
        this.saveId(res.data._id ? res.data._id : res.data)
        this.userName(this.input)
        this.startTimer()
        this.$router.push('/calendar')
        this.$q.loading.hide()
      })
    },
    getLocation () {
      this.$getLocation()
        .then(coordinates => {
          console.log(coordinates)
        })
    },
    pauseVid () {
      const vid = this.$refs.video
      vid.pause()
    },
    playVid () {
      const vid = this.$refs.video
      vid.play()
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
#register-scrin{
  display: flex;
  flex-direction: row;
  justify-content:center;
}
.submenu {
  display: none;
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
  height: 400px;
}
canvas{
  width: 50%;

}

</style>
