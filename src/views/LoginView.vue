<template>

    <div class="flex pt-40">
        <div class="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
            <header>
                <img class="w-20 mx-auto mb-5" src="/src/assets/oteacher-logo.png"/>
            </header>
            <div v-if="error.length != 0" class="text-xs mb-4 bg-pink-100 p-4  rounded-lg">
                {{error[0]}}
            </div>
            <form @submit.prevent="loginSubmit">
                <div>
                    <label class="block mb-2 text-dark" for="username">نام کاربری</label>
                    <input
                        class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                        type="text" name="username" v-model.trim="username">
                </div>
                <div>
                    <label class="block mb-2 text-dark" for="password">رمز عبور</label>
                    <input
                        class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                        type="password" name="password" v-model.trim="password">
                </div>
                <div>
                    <input class="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
                        type="submit"
                        value="ورود">
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            username: '',
            password: '',
            error:[]
        }
    },
    computed: {
        ...mapState([
            'loggingIn',
            'loginError'
        ])
    },
    methods: {
        ...mapActions([
            'doLogin'
        ]),
        loginSubmit(e) {
            e.preventDefault();
            this.error = [];

            if (this.username == '') {
                this.error.push('نام کاربری نمی تواند خالی باشد')
                return false;
            }

            if (this.password == '') {
                this.error.push('رمز عبور نمی تواند خالی باشد')
                return false;
            }

            if (this.username != 'admin' || this.password != '1234') {
                this.error.push('نام کاربری یا رمز عبور اشتباست!');
                return false;
            }

            this.doLogin({
                username: this.username,
                password: this.password
            });

        }
    }
}
</script>
  
<style scoped>

</style>
  