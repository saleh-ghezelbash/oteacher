<template>
    <div class="rounded bg-indigo-100 border mb-4 p-2 ">
        <div class="flex justify-between cursor-pointer" @click="hidden = !hidden">
            <span>ژانر</span>
            <font-awesome-icon icon="fa-solid fa-chevron-down" class="mr-auto text-md text-pink-700"/>
        </div>

        <div v-show="hidden" class="overflow-x-hidden">
            <input type="search" placeholder="جستجو در ژانر" v-model="search"  @input="searchItems"
                class="appearance-none border w-full mt-1 bg-white text-xs py-1 px-2 rounded">
            <div class="max-h-28 h-28 overflow-y-auto snap-y scrollbar pl-2 mt-1">
                <div v-for="genre in genreList" :key="genre.id"
                    class="flex justify-center items-center text-xs py-1 snap-start cursor-pointer transition ">
                    <div>
                        <input type="checkbox" class="mt-1" :value="genre.id" v-model="checkValue">
                    </div>
                    <div class="flex-grow-0 mx-1 w-10/12">
                        <span class="whitespace-nowrap text-ellipsis overflow-hidden max-w-fit block">
                            {{genre.name}}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <button @click="checkInput" class="border rounded text-white text-xs  bg-indigo-700 hover:bg-pink-700 py-2 px-4 mt-2 w-full">اعمال فیلتر</button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        dataList: Array
    },
    data() {
        return {
            hidden: true,
            genreList:[],
            checkValue: [],
            search: ""
        }
    },
    methods: {
        searchItems(e){
            this.genreList = this.dataList.filter(obj => obj.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
        },
        checkInput() {
            this.$emit('checkedValue',this.checkValue.join(','))
        }
    },
    watch: {
        dataList: {
            handler(n, o) {
                this.genreList = n;
            },
            deep: true,
            immediate: true
        }

    }
}
</script>

<style scoped>
</style>