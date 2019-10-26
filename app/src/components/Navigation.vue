<template>
  <ul>
    <li>
      <router-link to="/">Home</router-link>
    </li>
    <li>
      <router-link to="/recipes">Recipes</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Navigation',
  props: {

  }
}
</script>

<style scoped>
ul {
  text-align: left;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background: olive;
}

li {
  display: inline-block;
  /* border-bottom: transparent 4px solid; */
}
a:hover {
  color: #800000;
  border-bottom: #800000 4px solid;
}
.router-link-exact-active {
  /* color: #800000; */
  border-bottom: #800000 4px solid;
}
a {
  display: block;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  margin: 0;
  padding: 8px 16px;
}
</style>
