<template>
    <div class="legend">
        <div class="legend-item" v-for="(item, index) in list">
            <span class="color-block" @click="legendClick(item, index)"
                :style="{ background: item.disabled ? 'gray' : colorGroup[index] }"></span>
            <span class="name">
                {{ item.name }}
            </span>
            <span class="unit" :style="{ color: colorGroup[index] }">
                {{ item.value / total * 100 }}%
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { SeriesItem } from '@/types/chartType';
import { colorGroup } from '@/utils/index'
type Props = {
    series: Array<SeriesItem>
}
const props = defineProps<Props>()

const total = computed(() => {
    return props.series.reduce((pre, cur) => {
        return pre + cur.value
    }, 0)
})

let list = reactive(props.series)


list.forEach((item, index) => {
    item.disabled = false
})

const emits = defineEmits(['updateSeries'])

const legendClick = (item: SeriesItem, index: number) => {
    item.disabled = !item.disabled;
    emits('updateSeries', props.series)
}

</script>

<style scoped lang="scss">
.legend {
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    box-sizing: border-box;

    .legend-item {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        padding-bottom: 7px;
        padding-top: 15px;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(55, 61, 72, 1);

        .color-block {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 7px;
            cursor: pointer;
            position: relative;
        }

        .color-block::before {
            content: '';
            position: absolute;
            width: 10px;
            height: 2px;
            background: rgba(121, 133, 157, 1);
            bottom: -12px;
        }

        .name {
            flex: 1;
            font-size: 14px;
            font-family: ShiShangZhongHeiJianTi;
            font-weight: 400;
            color: #9AA1B3;
        }

        .unit {
            flex: 1;
            text-align: right;
            font-size: 14px;
            font-family: ShiShangZhongHeiJianTi;
            font-weight: 400;
            color: #61DAEC;
        }
    }
}
</style>