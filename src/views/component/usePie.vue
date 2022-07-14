<template>
    <div class="wrapper">
        <pie :series="series"></pie>
        <chartLegend @update-series="update" class="legend" :series="source"></chartLegend>
    </div>
</template>

<script lang="ts" setup>
import chartLegend from '@/components/chartComponent/legend.vue'
import pie from '@/components/chart/pie.vue';
import { SeriesItem } from '@/types/chartType';

let source = [
    {
        name: '公共区域餐饮',
        value: 30
    },
    {
        name: '办公楼',
        value: 15
    },
    {
        name: '绿化',
        value: 15
    },
    {
        name: '其他',
        value: 40
    }
]

let series = ref(source)



const update = (list: SeriesItem[]) => {
    series.value = list;
}

</script>

<style scoped lang="scss">
.wrapper {
    width: 400px;
    height: 200px;
    border: 1px solid;
    background: rgba($color: #000000, $alpha: 0.8);
    border-radius: 7px;
    position: fixed;
    left: calc(50% - 197px);
    top: calc(50% - 75px);
    display: flex;

    .legend {
        flex: 1;
    }
}
</style>