<template>
  <div id="app">
    <aside class="app__side-nav">
      <ul>
        <li>
          <router-link to="/">File Upload</router-link>
        </li>
      </ul>
    </aside>
    <div class="app__content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
// Not sure where to put global styles yet.
body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;

}
.app__side-nav {
  background: #1996d3;
  width: 200px;
}
.app__content {
  flex: 1 0 0px;
  padding: 60px;
}
.section {
  margin: 60px 0;
}
</style>
