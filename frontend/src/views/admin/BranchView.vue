
<!-- eslint-disable no-undef -->
<script setup>
import { onMounted, ref  } from 'vue';
import axios from "axios";
   
    let element_wrap;
    let geocoder;
    let companyList = ref([]);

    axios.get("//localhost:3000/api/admin/company").then((res) => {
        companyList.value = res.data;
    }).catch((err) => {
        console.log(`error : ${err}`);
    }); 

    onMounted(()=>{
        // 우편번호 찾기 찾기 화면을 넣을 element
        element_wrap = document.getElementById('wrap');
        geocoder = new kakao.maps.services.Geocoder();
  
    });

    const setBranch = () =>{
        let company = document.querySelector("input[name=branchCompany]").value; 
        let branchName = document.querySelector("input[name=branchName]").value; 
        let latitude = document.querySelector("input[name=latitude]").value;
        let longitude = document.querySelector("input[name=longitude]").value;
        if(company === '' || latitude === '' || longitude === '' || branchName === ''){
            alert("모든 정보를 입력하세요.");
            return;
        }
        const args = {
            paramCompany: company,
            paramBranchName: branchName,
            paramLatitude: latitude,
            paramLongitude: longitude
        };

        axios.post("//localhost:3000/api/admin/setBranch", { args }).then((res) => {
            if(res.data === 'exists'){
                alert("이미 등록된 지점입니다.");
                return;
            }
            if (res.status === 200) {
                alert("등록되었습니다.");
            }
        }).catch((err) => {
            console.log(`error : ${err}`);
        });
    }

    const geocoderCallback = (result, status) =>{
        if (status === kakao.maps.services.Status.OK) {
            document.querySelector(".longitude").value = result[0].x;
            document.querySelector(".latitude").value = result[0].y;
        }
    };
    const foldDaumPostcode = () => {
        // iframe을 넣은 element를 안보이게 한다.
        element_wrap.style.display = 'none';
    }
    
    const setBranchCompany = (companyName) => {
        document.querySelector(".branchCompany").value = companyName;
    }

    const sample3_execDaumPostcode = () => {
        // 현재 scroll 위치를 저장해놓는다.
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        new daum.Postcode({
            oncomplete: function(data) {
                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    //document.getElementById("sample3_extraAddress").value = extraAddr;
                
                } else {
                    //document.getElementById("sample3_extraAddress").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                //document.getElementById('sample3_postcode').value = data.zonecode;
                //document.getElementById("sample3_address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                //document.getElementById("sample3_detailAddress").focus();

                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_wrap.style.display = 'none';

                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                document.body.scrollTop = currentScroll;

                geocoder.addressSearch(addr, geocoderCallback);
            },
            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
            onresize : function(size) {
                element_wrap.style.height = size.height+'px';
            },
            width : '100%',
            height : '100%'
        }).embed(element_wrap);

        // iframe을 넣은 element를 보이게 한다.
        element_wrap.style.display = 'block';
    }
</script>
<template>
    <p class="text-center">지점 등록</p>
    <form>
        <div class="mb-3">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    편의점 선택
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li v-for="(company, idx) in companyList" :key="idx" class="dropdown-item">
                        <a @click="setBranchCompany(`${ company.NAME }`)">{{company.NAME}}</a>
                    </li>
                </ul>
            </div>
            <div class="mt-3">
                <input type="text" class="form-control branchCompany w-100" name="branchCompany" value="" readonly/>
                <br/>
                <input type="text" placeholder="지점명을 입력하세요.(ex: 구로싸이언점)" class="form-control branchCompany w-100" name="branchName" value=""/>
            </div>
        </div>
        <div class="mb-3 mt-3 border-top">
            <div class="pt-3 pb-3" style="">
                <div class="col-12">
                    <button type="button" class="btn btn-secondary" @click="sample3_execDaumPostcode()">주소 검색</button>
                </div>
                <div id="wrap" style="display:none;border:1px solid;width:100%;height:300px;margin:5px 0;position:relative">
                    <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" @click="foldDaumPostcode()" alt="접기 버튼">
                </div>
            </div>
            <div class="mt-3 d-flex">
                <label class="">위도</label>
                <input type="text" class="form-control latitude" name="latitude" value="" readonly/>
            </div>
            <div class="mt-3 d-flex">
                <label>경도</label>
                <input type="text" class="form-control longitude" name="longitude" value="" readonly/>
            </div>
        </div>
        <button @click="setBranch()" type="button" class="btn btn-primary">등록</button>
    </form>
</template>