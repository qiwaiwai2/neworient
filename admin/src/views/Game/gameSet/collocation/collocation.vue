<template>
    <div class="peizhi">
        <a-spin :spinning="spinning" :tip="loadingText">
            <div :style="{'height':contHeight-250+'px'}" class="peizhibox">
                <div class="peizhiItem" v-for="(item,index) in gameItemList" :key="index">
                    <ul>
                        <li>{{item.gameitemname}}</li>
                        <li v-for="(groupitem,groupindex) in item.arr" :key="groupindex">
                            <p>{{groupitem.groupName}}</p>
                            <p>{{groupitem.itemType==1?'人数':'队数'}}/单位：<a-input-number v-if="groupitem.itemType==1" v-model="groupitem.positionNum"></a-input-number> <a-input-number v-else  v-model="groupitem.teamNum"></a-input-number> </p>
                            <p>出发时间 ：<a-date-picker
                                    style="width:180px"
                                    class="game_time_select"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    :defaultValue="moment(groupitem.startTime?groupitem.startTime:$formatDate(new Date()))"
                                    :mode="mode"
                                    showTime
                                    @openChange="handleOpenChange1"
                                    @panelChange="handlePanelChange1"
                                    @change="(value,string) => confirmtime(value, string,index,groupindex)"
                                />
                            </p>
                            <p class="space" v-if="groupitem.itemType==1">出发间隔 ：<a-input v-model="groupitem.spacingTime" style="width:180px"></a-input> <span>S</span> </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="operate_btn">
                <a-button type="primary" style="margin-right:10px" @click="saveBtn">保存</a-button>
                <a-button type="primary" @click="cleanMan">清除人员数据</a-button>
            </div>
        </a-spin>
    </div>
</template>
<script>
import moment from 'moment'
import { findAllList, findItemGroupList, fingerupdateEntity, clearSportsmanList } from '@/api'
export default {
    data () {
        return {
           mode: 'time',
           competitionId: '', // 项目id
           gameItemList: [], // 所有科目
           spinning: false,
           loadingText: '配置中，请稍等'
        }
    },
    props: ['contHeight'],
    created () {
        this.competitionId = this.$route.query.gameId
    },
    mounted () {
        // console.log(this.$route.query)
        this.getGameItem()
    },
    methods: {
        moment,
        cleanMan () { // 清除人员数据
            this.$tips.confirm('是否确认清除人员数据？').then((res) => {
                clearSportsmanList(this.competitionId).then(res => {
                    console.log(res)
                    if (res.status == 1) {
                        this.$message.success('人员清除成功！', 1)
                    } else {
                        this.$message.success('人员清除失败！', 1)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        },
        saveBtn () { // 保存按钮
            // console.log(this.gameItemList)
            this.spinning = true
            let paramslist = []
            this.gameItemList.forEach(item => {
                item.arr.forEach(groupitem => {
                    paramslist.push({
                        id: groupitem.id, // uuid
                        groupId: groupitem.groupId, // 组别id
                        competitionItemId: groupitem.competitionItemId, // 科目id
                        startTime: typeof (groupitem.startTime) == 'string' ? groupitem.startTime : groupitem.startTime['_i'], // 开始时间
                        spacingTime: groupitem.spacingTime, // 时间间隔
                        teamNum: groupitem.teamNum, // 接力，几个队
                        popNum: groupitem.popNum, // 接力，每队多少人
                        positionNum: groupitem.positionNum, // 单人赛最大人数
                        itemType: groupitem.type// 科目类型，取科目type

                    })
                })
            })
            fingerupdateEntity(this.competitionId, paramslist).then(res => {
                // console.log(res)
                if (res.status == 1) {
                    this.spinning = false
                    this.$message.success('配置成功', 1)
                } else {
                    this.spinning = false
                }
            })
        },
        confirmtime (e, b, i, j) {
            // console.log(e,b,i,i)
            // console.log(name,id)
            this.$set(this.gameItemList[i].arr[j], 'startTime', b)
        },
       handleOpenChange1 (e) {

       },
       handlePanelChange1 (e) {

       },
       async getGameItem () { // 获取所有科目
            this.gameItemList = []
            let gameList = await findAllList(this.competitionId).then(res => {
                return res
            }).catch(err => {
                alert('网络请求错误，请稍后重试！')
                console.log(err)
            })

            if (gameList.status == 1) {
                let data = gameList.data
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    let groupitemid = item.id
                    await findItemGroupList(this.competitionId, groupitemid).then(res => { // 获取科目组别
                        console.log(res)
                        if (res.status == 1) {
                            for (let i = 0; i < res.data.length; i++) {
                                let item = res.data[i]
                                item.startTime = moment(item.startTime ? item.startTime : this.$formatDate(new Date()))
                            }
                            this.gameItemList.push({
                                gameitemname: item.itemName,
                                arr: res.data
                            })
                        }
                    })
                    }
                }
                console.log(this.gameItemList)
            }
        }

    }
}
</script>
<style lang="scss" scoped>
    .peizhi{
        .peizhibox{
            overflow-y: auto;
        }
        .peizhiItem{
            margin-bottom: 20px;
            font-size: 12px;
            ul{
                display: flex;
                border-left: 1px solid #ddd;
                li{
                    width: 290px;
                    height: 140px;
                    border: 1px solid #ddd;
                    border-left: none;
                    text-align: left;
                    &:nth-child(1){
                        line-height: 150px;
                        text-align: center
                    }
                    p{
                        margin: 5px 8px
                    }
                    .game_time_select{
                        width: 150px;
                    }
                    input{
                        width: 40px;
                        height: 28px;
                    }
                    .space{
                        position: relative;
                        span{
                            position: absolute;
                            right: 38px;
                            top: 4px
                        }
                    }
                }
            }
        }
    }
    .operate_btn{
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #E2F2FF;
        position: absolute;
        bottom: -70px;
        left: 0;
        right: 0
    }
</style>
