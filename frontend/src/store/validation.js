import axios from "axios";

const regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;

const validation = {
    password : (e) => {
        let _target = e.target;
        let validPassword = regExpPassword.test(_target.value);
        if(!validPassword){
            _target.classList.add("error");
        }else{
            _target.classList.remove("error");
        }
    },
    isUndefinedOrEmpty : (string) =>{
        return string == "" || string == undefined;
    }
}

export default validation;

