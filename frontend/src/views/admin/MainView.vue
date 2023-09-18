<script setup>

</script>
<template>
    <h4 class="text-center">관리자</h4>
    <hr/>
<div class="cards">
    <a class="card">
        <span class="inner">
                <RouterLink to="/admin/branch">
                    <button type="button" class="btn btn-outline-primary mr-md-3 mb-2 mb-md-0 w-100">지점 등록</button>
                </RouterLink>
        </span>
    </a>
    <a class="card">
        <span class="inner">
                <RouterLink to="/admin/branch">
                    <button type="button" class="btn btn-outline-primary mr-md-3 mb-2 mb-md-0 w-100">지점 관리</button>
                </RouterLink>
        </span>
    </a>
    <a class="card">
        <span class="inner">
                <RouterLink to="/admin/product">
                    <button type="button" class="btn btn-outline-primary mr-md-3 mb-2 mb-md-0 w-100">상품 등록</button>
                </RouterLink>
        </span>
    </a>
    <a class="card">
        <span class="inner">
                <RouterLink to="/admin/product">
                    <button type="button" class="btn btn-outline-primary mr-md-3 mb-2 mb-md-0 w-100">유저 관리</button>
                </RouterLink>
        </span>
    </a>
</div>
</template>
<style scoped>
        body {
            font-family: sans-serif;
        }

        body *,
        body *:before,
        body *:after {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        body .wrapper {
            width: 1140px;
            margin: 0 auto;
            max-width: 100%;
            padding: 0 15px;
        }

        body .clearfix:after {
            content: " ";
            clear: both;
            display: table;
        }
        .card {
            border:none;
        }
        .cards {
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
            gap:10px;
        }
        
        .cards>.wrapper:after {
            content: " ";
            display: table;
            clear: both;
        }

        .cards>.wrapper .side {
            float: left;
            width: 25%;
            padding: 110px 0;
        }

        .cards>.wrapper .side .title {
            color: #262626;
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 12.5px;
            display: block;
        }

        .cards>.wrapper .side .desc {
            color: #6a6a6a;
        }

        .cards>.wrapper .cards {
            margin-right: -15px;
            width: 75%;
            float: left;
        }

        .cards>.wrapper .cards:after {
            display: table;
            content: " ";
            clear: both;
        }

        .cards>.wrapper .cards .card {
            float: left;
            width: calc(100%/3);
            margin-bottom: 15px;
            display: block;
            padding: 0 15px;
            text-decoration: none;
        }

        .cards>.wrapper .cards .card .inner {
            text-align: center;
            display: block;
        }

        .cards>.wrapper .cards .card .inner:hover {
            border-color: #146ece;
        }

        .cards>.wrapper .cards .card .title {
            display: block;
            font-size: 20px;
            padding: 15px 0;
        }

        .cards>.wrapper .cards .card .desc {
            display: block;
        }

        .cards>.wrapper .cards .card button {
            border: 1px solid #146ece;
            background: none;
            cursor: pointer;
            color: #146ece;
            width: 170px;
            padding: 15px 0;
        }

        @media(max-width:991px) {
            .cards>.wrapper .side {
                float: none;
                width: 100%;
                text-align: center;
                padding: 0 0 50px 0;
            }

            .cards>.wrapper .cards {
                float: none;
                width: 100%;
            }

            .cards>.wrapper .cards .card {
                float: none;
                width: 100%;
            }
        }
    </style>