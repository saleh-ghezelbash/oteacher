<template>
    <div class="flex flex-col lg:flex-row leading-6 text-sm mb-1 w-full bg-indigo-100 rounded p-3 border">
        <div class="flex fex-grow w-full">
            <div class="relative flex-grow">
                <form @submit.prevent="searchSubmit">
                    <input v-model="searchValue" type="text" placeholder="جستجو در نام فیلم و خلاصه فیلم ..."
                        class="bg-white  py-2 w-full px-4 outline-none py-2 lg:ml-4  lg:w-96 mt-4 lg:mt-0 border-b-2 border-indigo-500">
                    <button type="submit"
                        class="appearance-none border rounded text-white font-bold bg-indigo-700 hover:bg-pink-700 py-2 px-4 w-full lg:w-40 mt-4 lg:mt-0">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="ml-2"/>
                        جستجو کنید
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchValue: ""
        }
    },
    methods: {
        searchSubmit() {
            this.$emit('search', this.searchValue);
        }
    }
}
</script>