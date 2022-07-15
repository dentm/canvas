<template>
  <router-view></router-view>
  <div class="btn-group">
    <div class="btn" v-for="(route, index) in routes" @click="page(route)"
      :style="{ background: 'rgb(' + index * 10 + ', ' + index * 20 + ', ' + index * 30 + ')' }">
      {{ route.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>

const router = useRouter();

const routes = router.options.routes.filter(route => route.name);


const page = (route: any) => {
  router.push(route.path);
}


</script>

<style scoped>
.btn-group {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  top: 10px;
}

.btn {
  position: relative;
  left: 200px;
  top: 20px;
  width: 80px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
  color: white;
  margin-top: 10px;
}
</style>