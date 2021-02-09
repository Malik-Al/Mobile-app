<template>
  <section class="calendar">
    <header>
      <slot name="headerSlot" :header="header" />
    </header>
    <transition :name="transitionName" mode="out-in">
    <div class="calendar__cells" :key="deltaChangedCounter">
      <slot name="topDaysSlot" :days="topDays" />
      <slot name="daysSlot" :days="days" />
    </div>
    </transition>
  </section>
</template>
