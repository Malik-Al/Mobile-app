<template>
  <div>
<div id="month-calendar">
    <ul class="month">
        <q-fab-action @click="clickLeft"  color="primary" icon="keyboard_arrow_left" class="prev"></q-fab-action>
        <q-fab-action @click="clickRing"  color="primary" icon="keyboard_arrow_right" class="next"></q-fab-action>
        <li class="month-name">{{ monthInner }}</li>
        <li class="year-name">{{ yearInner }}</li>
    </ul>

    <ul class="weekdays">
        <li v-for="i in weekdaysDate" :key="i">{{i}}</li>
    </ul>

    <ul class="days">
        <li v-for="(day, i) in monthPrefix" :key="i + 'prefix'">
        </li>
        <li v-for="(day, i) in monthDays" :key="i">
          {{ i + 1 }}
        </li>
    </ul>
</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      monthName: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
      monthInner: '',
      yearInner: '',
      daysInner: '',
      monthDays: '',
      monthPrefix: '',
      currentMonth: '',
      weekdaysDate: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    }
  },
  methods: {
    clickLeft () {
      this.showLoading()
      const nowDate = new Date(this.yearInner, this.monthName.indexOf(this.monthInner))
      nowDate.setMonth(nowDate.getMonth() - 1)

      const nowYear = nowDate.getFullYear()
      const nowMonth = nowDate.getMonth()

      this.setMonthCalendar(nowYear, nowMonth)
    },
    clickRing () {
      this.showLoading()
      const nowDate = new Date(this.yearInner, this.monthName.indexOf(this.monthInner))
      nowDate.setMonth(nowDate.getMonth() + 1)

      const nowYear = nowDate.getFullYear()
      const nowMonth = nowDate.getMonth()

      this.setMonthCalendar(nowYear, nowMonth)
    },
    setMonthCalendar (year, month) {
      const monthDays = new Date(year, month + 1, 0).getDate()
      const monthPrefix = new Date(year, month, 0).getDay()
      this.monthDays = new Array(+monthDays).fill(0)
      console.log(this.monthDays)
      this.monthPrefix = monthPrefix
      this.monthInner = this.monthName[month]
      this.yearInner = year
    },
    showLoading () {
      console.log(this.$q)
      this.$q.loading.show()
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = undefined
      }, 2000)
    }
  },
  beforeDestroy () {
    if (this.timer !== undefined) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  },
  mounted () {
    const nowDate = new Date()
    const nowMonth = nowDate.getMonth()
    const nowYear = nowDate.getFullYear()

    this.currentMonth = nowDate
    this.setMonthCalendar(nowYear, nowMonth)
  }
}
</script>

<style>
*{
    box-sizing: border-box;
}

body{
    font-family: sans-serif;
}

/* месяцы и годы */
#month-calendar{
    margin-top: 1%;
    position: fixed;
    width: 100%;
}

.month{
    margin: 0;
    padding: 3rem 2rem 2rem;
    background:#A80DF5 ;
    text-align: center;
    width: 100%;
    color: #ffffff;
    list-style: none;
}

.month li{
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.4;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    font-weight: 700;
}

/* .month li.prev,
.month li.next{
    cursor: pointer;
} */

.prev{
    float: left;
}

.next{
    float: right;
}

.month li.year-name{
    font-size: 1.2rem;
    font-weight: 400;
}

/* дни недели */
.weekdays{
    margin: 0;
    padding: 1rem 0;
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: left;
}

.weekdays li{
    display: inline-block;
    flex: 0 0 calc(100% / 7);
    text-align: center;
}

/* дни */
.days{
    margin: 0;
    padding: 1rem 0;
    background-color:white;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-content: flex-start;
    height: 25rem;
}

.days li{
    padding: 0.5rem;
    list-style: none;
    display: inline-block;
    flex: 0 0 calc(100% / 7);
    text-align: center;
    color: #000;
    font-size: 1rem;
    line-height: 1rem;
    border: 0.1rem groove #d699f0;
    height: 4rem;
}

.days li.date-now{
    color: #000;
    font-weight: 700;
}
</style>
