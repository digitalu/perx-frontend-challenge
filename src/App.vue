<template>
  <div id="app">
    <aside class="app__side-nav">
      <ul>
        <li>
          <router-link to="/" active-class="active" exact>
            <span class="icon el-icon-document"></span> File Upload
          </router-link>
        </li>
        <li>
          <a href="#">
            <span class="icon el-icon-printer"></span> Reports
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon el-icon-setting"></span> Settings
          </a>
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  overflow: auto;
}
.app__side-nav {
  background: #06215d;
  display: none;
  @media (min-width: 768px) {
    width: 200px;
    display: block;
  }
  ul {
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
    li {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;

    }
    a {
      color:#fff;
      display: block;
      text-decoration: none;
      padding:16px;
      transition: .2s all ease-in;
      &.active {
        background: #1996d3;
      }
      &:hover {
        background: #0093a2;
      }
    }
  }
  .icon {
    margin-right: 8px;
  }
  &.active {
    // [TODO]: Create a mobile menu
  }
}
.app__content {
  flex: 1 0 0px;
  overflow: auto;
  background: #eee;
}
.section {
  margin: 60px 0;
}
.page {
  margin: 20px;
  @media (min-width: 768px) {
    margin: 20px 40px;
  }
  h1 {
    margin: -20px -40px;
    padding: 20px 40px 20px;
    border-bottom: 1px solid #cecece;
    background: #fff;
  }
}
</style>
