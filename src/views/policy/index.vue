<template>
  <div>
    <SearchBar @search="searchFn" lastInpTitle="工单编号" />
  </div>
</template>

<script>
import SearchBar from '@/components/SerchBar'
export default {
  name: 'policy',
  data() {
    return {}
  },
  components: {
    SearchBar,
  },

  created() {},

  methods: {
    searchFn() {},
  },

  computed: {},
}
</script>

<style scoped></style>
