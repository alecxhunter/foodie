<template>
  <ul>
    <li>
      <router-link to="/">Home</router-link>
      <!-- <a href="#/">Home</a> -->
    </li>
    <li>
      <router-link to="/recipes">Recipes</router-link>
      <!-- <a href="#/recipes">Recipes</a> -->
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
}

li {
  display: inline;
  margin: 0;
  padding: 8px 16px;
}
li:hover {
  color: #b1e2e6;
  border-bottom: #4c4c4c 2px solid;
}

a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}
</style>
