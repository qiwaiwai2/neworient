<template>
  <div class="bib">
    <a-spin :spinning="spinning" :tip="loadingText">
        <div class="drawLoats_head">
            <div class="game_select">
                项目：
                <a-select :defaultValue="game[0]" style="width: 250px" @change="handlegameceChange">
                    <a-select-option v-for="province in game" :key="province">{{province}}</a-select-option>
                </a-select>
            </div>
            <div class="game_select">
                科目：
                <a-select v-model="secondCity" style="width: 250px" @change="handlegameItemceChange">
                    <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
                </a-select>
            </div>
            <a-button style="margin-left:10px" @click="leadOut" type="primary">导出文件</a-button>
        </div>
        <div class="bib_cont" :style="{'height':contHeight-230+'px'}">
            <a-table :columns="columns" :dataSource="gamedata" :pagination="false" >
                <span slot="bib" class="operate" slot-scope="text, record">
                    <a-input style="width:100px;text-align:center" @change="changeBib(record.bib)" v-model="record.bib"></a-input>
                </span>
            </a-table>
        </div>
        <div class="operate_btn">
            <a-button type="primary" @click="saveBtn">保存</a-button>
        </div>
    </a-spin>
  </div>
</template>
<script>
import { findAllCompetition, findEntity, findSportsmanNoList, bibsaveEntity } from '@/api'
export default {
    data () {
        return {
            spinning: false,
            loadingText: '请稍后',
            gameList: {}, // 项目列表
            gameItemList: {}, // 科目列表
            game: [
                '请选择'
            ],
            gameItem: {
                请选择: ['请选择']
            },
            cities: null, // 项目
            secondCity: null, // 科目
            currentGame: '', // 当前选择的项目名称
            currentGameId: '', // 当前选择的项目Id
            currentGameItemId: '', // 当前选择的科目Id
            columns: [{
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                    align: 'center'
                }, {
                    title: '单位',
                    dataIndex: 'address',
                    key: 'address',
                    align: 'center'
                }, {
                    title: '组别',
                    dataIndex: 'group',
                    key: 'group',
                    align: 'center'
                }, {
                    title: '队号',
                    dataIndex: 'teamNum',
                    key: 'teamNum',
                    align: 'center'
                }, {
                    title: '棒次',
                    dataIndex: 'relayNo',
                    key: 'relayNo',
                    align: 'center'
                }, {
                    title: '号码布',
                    key: 'bib',
                    dataIndex: 'bib',
                    scopedSlots: { customRender: 'bib' },
                    align: 'center'
            }],
            gamedata: [], // 表格数据
            saveData: []// 保存数据
        }
    },
    props: ['contHeight'],
    mounted () {
        this.cities = this.gameItem[this.game[0]]
        this.secondCity = this.gameItem[this.game[0]][0]
        this.getGameList()
        this.currentGameId = ''
        this.currentGameItemId = ''
    },
    methods: {
        leadOut () { // 导出文件
            if (this.currentGameId) {
                let url = process.env.BASE_URL + 'along/CrossSportsmanController/exportLotsExcel?competitionId=' + this.currentGameId + '&competitionItemId=' + this.currentGameItemId
                window.location.href = url
            } else {
                alert('请先选择项目科目！')
            }
        },
        saveBtn () { // 保存
            this.spinning = true
            this.gamedata.forEach(item => {
                this.saveData.push({
                    id: item.bibid, // 号码布id
                    sportsmanId: item.key, // 人员id
                    no: item.bib, // 号码布
                    competitionItemId: this.currentGameItemId, // 科目id
                    groupId: item.groupid, // 组别id
                    competitionId: this.currentGameId// 项目id
                })
            })
            console.log(this.saveData)
            bibsaveEntity(this.saveData).then(res => {
                console.log(res)
                if (res.status == 1) {
                    this.spinning = false
                    this.$message.success('保存成功！', 1)
                } else {
                    this.spinning = false
                    // this.$message.error('保存失败！',1)
                }
            })
        },
        changeBib (e) {

        },
        getGameList () { // 获取项目列表
            findAllCompetition().then(res => {
                let data = res
                if (data.status == 1) {
                    let gameList = data.data
                    gameList.forEach(ele => {
                        this.game.push(ele.name)
                        this.gameList[ele.name] = ele.id
                        findEntity(ele.id).then(res => { // 获取科目列表
                            // console.log(res)
                            if (res.status == 1) {
                                let gameDetail = res.data
                                this.gameItem[gameDetail.name] = []
                                this.gameItemList[gameDetail.name] = {}
                                gameDetail.competitionItem.forEach(ele => {
                                    if (ele.type == 2) {
                                        this.gameItem[gameDetail.name].push(ele.itemName)
                                        this.gameItemList[gameDetail.name][ele.itemName] = ele.id
                                    }
                                })
                            }
                        })
                    })
                }
            }).catch(err => {

            })
        },
        handlegameceChange (value) { // 项目科目选择
            if (value != '请选择') {
                this.cities = this.gameItem[value]
                this.secondCity = this.gameItem[value][0]
                this.currentGame = value// 项目名称
                this.currentGameId = this.gameList[value]// 项目id
                this.currentGameItemId = this.gameItemList[value][this.secondCity]// 科目id
                console.log(78)
                this.getsportsman()
            }
        },
        handlegameItemceChange (value) { // 项目科目选择
            this.currentGameItemId = this.gameItemList[this.currentGame][value]// 科目id
            this.getsportsman()
        },
        getsportsman () {
            this.gamedata = []
            this.spinning = true
            findSportsmanNoList(this.currentGameId, this.currentGameItemId).then(res => {
                console.log(res)
                if (res.status == 1) {
                    let data = res.data
                    data.forEach((item, index) => {
                        this.gamedata.push({
                            key: item.id, // 人员id
                            name: item.name, // 名字
                            address: item.nationality, // 单位
                            group: item.groupName, // 组别名称
                            groupid: item.groupId, // 组别id
                            teamNum: item.teamNo, // 队号
                            relayNo: item.relayNo, // 棒次
                            bib: item.no, // 号码布
                            bibid: item.sportsmanNoId// 号码布id
                        })
                    })
                    this.spinning = false
                }
            }).catch(err => {
                this.spinning = false
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.drawLoats_head{
    background-color: #E2F2FF;
    height: 40px;
    display: flex;
    align-items: center;
    .game_select{
        margin-left: 60px
    }
}
.operate_btn{
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #E2F2FF;
    position: absolute;
    bottom: -70px;
    left: 0;
    right: 0
}
.bib_cont{
    padding: 20px;
    overflow-y: auto;
    table{
        width: 800px;
        border: 1px solid #ddd;
        td{
            height: 40px ;
            padding: 0
        }
        th{
            height: 40px ;
            padding: 0
        }
    }
    input{
        width: 100px;
        text-align: center;
        height: 25px;
    }
}
</style>
