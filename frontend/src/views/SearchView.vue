<script setup>
      const getLocation = () => {
        if (navigator.geolocation) { // GPS를 지원하면
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log(`mylatitude : ${position.coords.latitude}\nmylongitude : ${position.coords.longitude}`);
          }, function(error) {
            console.error(error);
            if(error.code === 1){
              alert("위치 권한을 설정해주세요.");
            }
          }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
          });
        } else {
          alert('GPS를 지원하지 않습니다');
        }
      }

      getLocation();
</script>

<template>
  <p class="text-center">상품 검색</p>
</template>
