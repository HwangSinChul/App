import { createStore } from "vuex"
//import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state : {
        account: {
            id: null,
            name: "",
        },
        form: {
            email: "",
            password: "",
        },
        validEmail : false
    },
    mutations:{
        logOut(){
            this.$axios.delete("/api/account").then(() => {
                alert("로그아웃하였습니다.");
                this.state.account.name = "";
            });
        },
        logIn(){
            this.$axios.get("/api/account").then((res) => {
                this.state.account = res.data;
            });
        },
        updateFormEmail(state, paramEmail){
            state.form.email = paramEmail;
        },
        updateAccountEmail(state, paramEmail){
            state.account.email = paramEmail;
        },
        updateValidEmail(state, bool){
            state.validEmail = bool;
        }


    }
})

export default store

