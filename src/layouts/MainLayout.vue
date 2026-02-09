<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10">
      <q-toolbar class="constrain">
        <q-btn
          to="/camera"
          class="large-screen-only q-mr-sm"
          round
          dense
          icon="eva-camera-outline"
          size="18px"
        />
        <q-separator class="large-screen-only" vertical spaced="" />
        <q-toolbar-title class="grand-hotel-regular text-bold"> Quasagram </q-toolbar-title>
        <q-btn to="/" class="large-screen-only" round dense icon="eva-home-outline" size="18px" />
      </q-toolbar>
    </q-header>

    <q-footer
      class="bg-white small-screen-only"
      bordered
      active-color="primary"
      indicator-color="transparent"
    >
      <q-tabs class="text-grey-10">
        <q-route-tab name="home" icon="eva-home-outline" label="Home" to="/" />

        <q-route-tab name="camera" icon="eva-camera-outline" label="Camera" to="/camera" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="sass">
.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 80px
.q-toolbar__title
  @media (max-width: $breakpoint-xs-max)
    text-align: center
  @media (min-width: $breakpoint-sm-min)
    text-align: left
  font-size: 40px
  font-weight: bold

.q-footer .q-tab__icon
  font-size: 30px
</style>
