
<script setup>
import axios from "axios";
import store from "../store/store";
import valid from "../store/validation";

const validEmail = () => {
  const storeEmail = store.state.form.email;

  return new Promise((resolve) => {
    axios.get("//localhost:3000/api/validEmail", { params: { email: storeEmail } }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      console.log(`error : ${err}`);
    });
  }).then((res) => {
    const resEmail = res[0].EMAIL;
    if (resEmail != "" && resEmail != undefined) {
      alert(`Invalid Email\n ${resEmail} already in use `);
      store.commit('updateFormEmail', '');
      document.querySelector("#email").value = '';
      return false;
    }
    
    store.commit('updateValidEmail', true);

  }).catch((err) => {
    console.log(`fn_validEmail error : ${err}`);
  });

}

const updateEmail = (e) => {
  const paramEmail = e.target.value;
  store.commit('updateFormEmail', paramEmail);
}

const signup = () => {

  if (!store.state.validEmail) {
    alert("Return valid Email");
    return false;
  }

  const args = {
    email: store.state.form.email,
    password: store.state.form.password,
  };

  axios.post("//localhost:3000/api/signup", { args }).then((res) => {
    if (res.status === 200) {
      store.commit('updateAccountEmail', res.data.EMAIL);
    }
  }).catch((err) => {
    console.log(`error : ${err}`);
  });
}
</script>
<template>
  <section class="pt-4 pb-4" style="background-color: #eee;">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-12 col-lg-12 col-xl-12 order-2 order-lg-1">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">Your Email</label>
                        <div class="d-flex justify-content-between col-md-12">
                          <div class="col-md-8">
                            <input @input="updateEmail" type="email" id="email" class="form-control" />
                          </div>
                          <div class="col-md-4">
                            <button @click="validEmail()" class="btn btn-secondary">valid email</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4c">Password</label>
                        <input @keydown="valid.password($event)" type="text" id="form3Example4c" class="form-control" />
                        <span class="error errorMsg d-none">Invalid password</span>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                        <input v-model="store.state.form.password" type="password" id="form3Example4cd"
                          class="form-control" />
                      </div>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" class="btn btn-primary btn-lg" @click="signup()">Register</button>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.error {
  color: red;
  border-color: red;
}
</style>