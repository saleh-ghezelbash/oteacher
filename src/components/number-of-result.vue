<template>
    <div class="rounded bg-indigo-100 border mb-4 p-2">
        تعداد نتایج
        <select @change="selectNumberOfItems" v-model="value"
            class="border rounded w-full block mt-1 px-2 py-1 bg-white outline-none text-xs">
            <option value="" selected>
                نمایش 20 نتیجه
            </option>
            <option value="24">
                نمایش 24 نتیجه
            </option>
            <option value="30">
                نمایش 30 نتیجه
            </option>
            <option value="36">
                نمایش 36 نتیجه
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
        selectNumberOfItems() {
            this.$emit('per-page', this.value)
        }
    }
}
</script>