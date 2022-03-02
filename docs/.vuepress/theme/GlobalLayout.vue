<template>
  <div id="global-layout">
    <Header />
    <component :is="layout" />
    <Footer />
  </div>
</template>

<script>
export default {
}

</script>