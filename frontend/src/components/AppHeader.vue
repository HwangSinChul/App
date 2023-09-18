<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="wrapper">
            <RouterLink to="/">
                <h3 class="text-center mt-3">CULover</h3>
            </RouterLink>
            <div class="col-md-4 text-end signBtn">
                <RouterLink to="/login">
                    <button type="button" class="btn btn-outline-primary me-2">Sign in</button>
                </RouterLink>
            </div>
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mt-3">
                <ul class="nav col-12">
                    <li class="active">
                        <RouterLink to="/">
                            Home
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/search">
                            Search
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/mySnack">
                            My-Snack
                        </RouterLink>
                    </li>
                    <!-- <li><a href="#" class="nav-link px-2 link-dark">FAQs</a></li> -->
                </ul>
            </header>
        </div>
    <RouterView />
</template>

<style scoped>
.wrapper{
    position:relative;
}
.signBtn{
    position: absolute;
    right:1%;top:1%;
}
header {
    text-align: center;
    padding:15px 0;
    border-bottom: 1px solid #eee;
}
header .active,
header .active a {
  background-color: #308e36;
  display: block;
  text-decoration: none;
  color: white;
  font-family: Arial;
}
header li a {
  display: block;
  background-color: #303331;
  padding: 14px 16px;
  text-decoration: none;
  color: white;
  font-family: Arial;
}

header li {
  float:left;
}
header li a:hover:not(.active) {
  background-color: black;
}
header ul {
  list-style-type: none;
  background-color: #303331;
  overflow: hidden;
  padding: 0px;
  margin: 0px;
  justify-content: center;;
}
</style>