<script setup>
import { ref  } from 'vue';
import axios from "axios";

    let branchList = ref([]);

    axios.get("//localhost:3000/api/admin/branch").then((res) => {
        branchList.value = res.data;
    }).catch((err) => {
        console.log(`error : ${err}`);
    }); 
    const setBranch = (branchIdx) => {
        document.querySelector("input[name=branchIdx]").value = branchIdx;
    }
</script>
<template>
    <form action="//localhost:3000/api/admin/upload" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="branchIdx" value="">
        <div class="mb-3">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    편의점 지점 선택
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li v-for="(branch, idx) in branchList" :key="idx" class="dropdown-item">
                        <a @click="setBranch(`${ branch.IDX }`)">({{ branch.NAME }}){{branch.BRANCH_NAME}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mb-3 mt-3 border-top">
            <div class="mt-3 d-flex">
                <label>
                상품명
                </label>
                <input type="text" class="form-control productName" name="productName" value=""/>
            </div>
            <div class="mt-3 d-flex">
                <label>
                제조사
                </label>
                <input type="text" class="form-control manufacturer" name="manufacturer" value=""/>
            </div>
            <div class="mt-3 d-flex">
                <label>
                    가격
                </label>
                <input type="text" class="form-control price" name="price" value=""/>
            </div>
            <div class="mt-3 d-flex">
                <label>
                    할인율
                </label>
                <input type="text" class="form-control discountRate" name="discountRate" value=""/>
            </div>
            <div class="mt-3 d-flex">
                <label>
                    할인금액
                </label>
                <input type="text" class="form-control discountPrice" name="discountPrice" value=""/>
            </div>
            <div class="mt-3 d-flex">
                <label>
                    할인기간
                </label>
                <input type="date" class="form-control startDate" name="startDate" value=""/>
                <input type="date" class="form-control endDate" name="endDate" value=""/>
            </div>
            <hr/>
            <div class="mt-3 d-flex upload-image">
                <p>업로드 이미지</p>
                <input type="file" name="productImg">
            </div>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-primary">등록</button>
        </div>
    </form>
</template>
<style scoped>
label{
    width:30%;
}
.upload-image{
    flex-direction: column;
}
</style>