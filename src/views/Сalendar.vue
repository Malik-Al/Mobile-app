<template>
  <div>
<div id="month-calendar">

    <ul class="month">
        <li class="prev"><i class=""></i></li>
        <li class="next"><i class=""></i></li>
        <li class="month-name"></li>
        <li class="year-name"></li>
    </ul>

    <ul class="weekdays">
        <li>Пн</li>
        <li>Вт</li>
        <li>Ср</li>
        <li>Чт</li>
        <li>Пт</li>
        <li>Сб</li>
        <li>Вс</li>
    </ul>

    <ul class="days">
        <li>1</li>
        <li>2</li>
        <li>...</li>
        <li>31</li>
    </ul>
</div>
  </div>
</template>
<script>
export default {
  mounted () {
    const nowDate = new Date()
    const nowDateNumber = nowDate.getDate()
    const nowMonth = nowDate.getMonth()
    const nowYear = nowDate.getFullYear()
    const container = document.getElementById('month-calendar')
    const monthContainer = container.getElementsByClassName('month-name')[0]
    const yearContainer = container.getElementsByClassName('year-name')[0]
    const daysContainer = container.getElementsByClassName('days')[0]
    const prev = container.getElementsByClassName('prev')[0]
    const next = container.getElementsByClassName('next')[0]
    const monthName = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']

    // eslint-disable-next-line no-unused-vars
    console.log(nowDate.getFullYear())

    function setMonthCalendar (year, month) {
      const monthDays = new Date(year, month + 1, 0).getDate()
      const monthPrefix = new Date(year, month, 0).getDay()
      let monthDaysText = ''

      monthContainer.textContent = monthName[month]
      yearContainer.textContent = year
      daysContainer.innerHTML = ''

      if (monthPrefix > 0) {
        for (let i = 1; i <= monthPrefix; i++) {
          monthDaysText += '<li></li>'
        }
      }

      for (let i = 1; i <= monthDays; i++) {
        monthDaysText += '<li>' + i + '</li>'
      }

      daysContainer.innerHTML = monthDaysText

      // eslint-disable-next-line eqeqeq
      if (month == nowMonth && year == nowYear) {
        // eslint-disable-next-line no-undef
        days = daysContainer.getElementsByTagName('li')
        // eslint-disable-next-line no-undef
        days[monthPrefix + nowDateNumber - 1].classList.add('date-now')
      }
    }

    setMonthCalendar(nowYear, nowMonth)

    prev.onclick = function () {
      const curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent))

      curDate.setMonth(curDate.getMonth() - 1)

      const curYear = curDate.getFullYear()
      const curMonth = curDate.getMonth()

      setMonthCalendar(curYear, curMonth)
    }

    next.onclick = function () {
      const curDate = new Date(yearContainer.textContent, monthName.indexOf(monthContainer.textContent))

      curDate.setMonth(curDate.getMonth() + 1)

      const curYear = curDate.getFullYear()
      // eslint-disable-next-line no-undef
      curMonth = curDate.getMonth()

      // eslint-disable-next-line no-undef
      setMonthCalendar(curYear, curMonth)
    }
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
    width: 100%;
}

.month{
    margin: 0;
    padding: 3rem 2rem 2rem;
    background: #555555;
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

.month li.prev,
.month li.next{
    cursor: pointer;
}

.month li.prev{
    float: left;
}

.month li.next{
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
    background-color: #dddddd;
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
    background-color: #eeeeee;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-content: flex-start;
    height: 14rem;
}

.days li{
    padding: 0.5rem;
    list-style: none;
    display: inline-block;
    flex: 0 0 calc(100% / 7);
    text-align: center;
    color: #999;
    font-size: 0.9rem;
    line-height: 1rem;
}

.days li.date-now{
    color: #000;
    font-weight: 700;
}
</style>
