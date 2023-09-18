<template>
    <section class="pt-4 pb-4" style="background-color: #eee;">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px;">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-12 col-lg-12 col-xl-12 order-2 order-lg-1">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in to CULover</p>

                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">Your Email</label>
                          <div class="col-md-12">
                            <input type="email" id="email" class="form-control" />
                          </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4c">Password</label>
                        <input type="text" id="form3Example4c" class="form-control" />
                        <span class="error errorMsg d-none">Invalid password</span>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" class="btn btn-primary btn-lg">Sign in</button>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <RouterLink to="/signup">
                        <button type="button" class="btn btn-secondary">Sign up</button>
                        </RouterLink>
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