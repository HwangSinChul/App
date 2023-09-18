
<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const isAdmin = location.href.indexOf("admin") > -1;
</script>

<template>
  <div class="d-flex col-12">
    <div class="manual col-3 p-3">
      <h3>프로젝트 : CULover</h3>
      <h5>##편의점의 자주 사는 물건을 관심 상품으로 등록</h5>
      <h5>##근처 편의점의 할인 가격을 비교하여 가장 가까운 편의점으로 안내</h5>
      <br/>
      <h3>개발 환경</h3>
      <p>
        Frontend : vue3, bootstrap5, jquery<br/>
        Backend : nodejs, mysql<br/>
        Devops : git, AWS
      </p>
      <br/>
      <h3>Admin</h3>
      <h5>지점 등록, 상품 등록 /admin</h5>
    </div>
    <div class="col-7 mt-5">
      <div class="smartphone">
        <div v-if="!isAdmin" class="content">
        <AppHeader></AppHeader>
        <AppFooter></AppFooter>
      </div>
      <div v-else  class="content admin">
        <RouterView></RouterView>
      </div>
    </div>
     
    </div>
  </div>
  
</template>
<style>
.manual{
  border:#d7d7d7;
}
.content.admin{
  padding:30px;
}
a { text-decoration: none; color:#000;}
/* The device with borders */
.smartphone {
  position: relative;
  width: 400px;
  height: 640px;
  margin: auto;
  border: 16px black solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  border-radius: 36px;
}

/* The horizontal line on the top of the device */
.smartphone:before {
  content: '';
  display: block;
  width: 60px;
  height: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 10px;
}

/* The circle on the bottom of the device */
.smartphone:after {
  content: '';
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  bottom: -65px;
 transform: translate(-50%, -50%);
  background: #333;
  border-radius: 50%;
}

/* The screen (or content) of the device */
.smartphone  {
  width: 400px;
  height: 760px;
  background: white;
}
.content{
 width: 100%;
  height: 100%;
  background: white;
  max-height: 760px;
    overflow-y: scroll;
} 
iframe {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
}
</style>