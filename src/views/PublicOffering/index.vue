<script lang="ts" setup>
import { ref } from 'vue';
import TagVue from '../../components/Header/Tag.vue';
import CharacterAvatar from '../../components/CharacterAvatar.vue'
import lodash from 'lodash'

import { characters } from '../../character'

// 资历
const rarity = [
  "新手",
  "资深干员",
  "高级资深干员",
]
// // 位置
const place = [
  "近战位",
  "远程位",
]
// // 职业
const type = [
  "先锋",
  "近卫",
  "狙击",
  "重装",
  "医疗",
  "辅助",
  "术师",
  "特种",
]
// // 词条
const tag = [
  "治疗",
  "支援",
  "输出",
  "群攻",
  "减速",
  "生存",
  "防护",
  "削弱",
  "位移",
  "控场",
  "爆发",
  "召唤",
  "快速复活",
  "费用回复",
  "支援机械",
]

const checkedTag = ref<string[]>([])
const switchTag = (tag: string) => {
  if (checkedTag.value.indexOf(tag) == -1) {
    if (checkedTag.value.length >= 6) alert("最多6个词条")
    else {
      checkedTag.value.unshift(tag)
      allPossible()
    }
  }
  else {
    checkedTag.value.splice(checkedTag.value.indexOf(tag), 1)
    allPossible()
  }
}

// 过滤重复
const getSame = (arrs: any) => {
  let newArrs: any = []
  arrs.forEach((value: any, index: number) => {
    if (JSON.stringify(newArrs).indexOf(JSON.stringify(value)) == -1) newArrs.push(value)
  });
  return newArrs
}

const getTarget = (arrs: any, combs: any) => {
  let thisRes: any = arrs
  combs.forEach((value: string, index: number) => {
    // 过滤tag
    thisRes = thisRes.filter((x: any) => { return JSON.stringify(x).indexOf(value) > -1 })

    // 过滤星级
    if (JSON.stringify(combs).indexOf("高级资深干员") == -1) {
      thisRes = thisRes.filter((x: any) => {
        return !(JSON.stringify(x).indexOf("高级资深干员") > -1)
      })
    }
  });
  // 去重复
  // thisRes = thisRes.slice(0, thisRes.length / combs.length)
  thisRes = getSame(thisRes)
  // 如果是空就null
  if (thisRes.length == 0) return null
  else return lodash.orderBy(thisRes, ['rarity'], ['asc'])
}

const combs = ref<any>([])
const finalResult = ref()

const allPossible = () => {
  // 所有可能的结果
  var len = checkedTag.value.length;
  var count = Math.pow(2, len);
  combs.value = [];
  finalResult.value = []
  for (var i = 0; i < count; i++) {
    var ts = [];
    for (var j = 0, mask = 1; j < len; j++) {
      if ((i & mask) !== 0) {
        ts.push(checkedTag.value[j]);
        // console.log(checkedTags[j]);
      }
      mask = mask * 2;
    }
    if (ts.length > -1 && ts.length <= 3) {
      combs.value.push(ts);
    }
  }

  combs.value.forEach((value: string[], index: number,) => {
    var thisArr: any = []
    value.forEach((value: any, index: any) => {
      // 获取此tag的元素
      thisArr = lodash.concat(thisArr, characters.tags[value])
    });
    var thisRes = getTarget(thisArr, value)
    finalResult.value = lodash.concat(finalResult.value, [thisRes])
  });
}
</script>

<template>
  <div class="public-offering">
    <div class="title">
      <p>公招计算</p>
    </div>
    <div class="main">
      <div class="part">
        <div class="type">
          干员资历
        </div>
        <div class="tags">
          <TagVue v-for="(data, i) in rarity" @click="switchTag(data)" :active="checkedTag.indexOf(data) > -1"
            :important="data.indexOf('资深') > -1">{{ data
            }}</TagVue>
        </div>
      </div>
      <div class="part">
        <div class="type">
          干员位置
        </div>
        <div class="tags">
          <TagVue v-for="(data, i) in place" @click="switchTag(data)" :active="checkedTag.indexOf(data) > -1">{{ data }}
          </TagVue>
        </div>
      </div>
      <div class="part">
        <div class="type">
          干员职业
        </div>
        <div class="tags">
          <TagVue v-for="(data, i) in type" @click="switchTag(data)" :active="checkedTag.indexOf(data) > -1">{{ data }}
          </TagVue>
        </div>
      </div>
      <div class="part">
        <div class="type">
          干员词条
        </div>
        <div class="tags">
          <TagVue v-for="(data, i) in tag" @click="switchTag(data)" :active="checkedTag.indexOf(data) > -1">{{ data }}
          </TagVue>
        </div>
      </div>
      <div v-for="(combsData, i) in combs" :key="i">
        <!-- 不渲染空 -->
        <div class="part" v-if="finalResult[i] != null">
          <div class="type">
            <div style="display: grid;grid-template-columns: repeat(1, 1fr);gap: 2rem">
              <TagVue v-for="(tagsData, j) in combsData">{{ tagsData }}</TagVue>
            </div>
          </div>
          <div class="avatars">
            <CharacterAvatar v-for="(data, j) in finalResult[i]" :key="j" :member="data" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.public-offering {
  .title {
    background-color: #00000080;
    border-top: 6px solid #f29800;
    padding: 1rem 7rem;
    margin-bottom: 2rem;

    p {
      color: white;
      font-size: 2rem;
    }
  }

  .main {
    background-color: #ffffff4d;
    padding: 0.5rem 2rem;

    .part {
      margin: 2rem 0;
      background: #f8f8f8e0;
      padding: 1rem 3rem;
      box-shadow: 0 0 7px #0000004d;
      display: flex;
      align-items: center;

      .type {
        font-size: 1.25rem;
        margin-right: 3rem;
        flex-shrink: 0;
      }

      .tags {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 9rem);
        grid-gap: 2rem;
      }

      .avatars {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, calc(5rem + 7px));
        grid-gap: 2rem;
      }
    }
  }
}
</style>