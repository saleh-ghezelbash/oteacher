<template>
    <div class="rounded bg-indigo-100 border mb-4 p-2">
        مرتب سازی
        <select @change="selectSort" v-model="value"
            class="appearance-none border rounded w-full block mt-1 px-2 py-1 bg-white outline-none text-xs">
            <option value="" selected>
                مرتب سازی پیش‌ فرض
            </option>
            <option value="vote_average.asc">
                بر اساس امتیاز - صعودی
            </option>
            <option value="vote_average.desc">
                بر اساس امتیاز - نزولی
            </option>
            <option value="vote_count.asc">
                بر اساس تعداد رای - صعودی
            </option>
            <option value="vote_count.desc">
                بر اساس تعداد رای - نزولی
            </option>
            <option value="release_date.asc">
                بر اساس تاریخ انتشار - صعودی
            </option>
            <option value="release_date.desc">
                بر اساس تاریخ انتشار - نزولی
            </option>
        </select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: ""
        }
    },
    methods: {
        selectSort() {
            this.$emit('sort', this.value)
        }
    }
}
</script>