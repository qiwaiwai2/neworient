<template>
    <div class="drawLoats">
        <a-spin :spinning="spinning" :tip="loadingText">
            <div class="drawLoats_head">
                <div class="game_select">
                    项目：
                    <a-select :defaultValue="game[0]" style="width: 250px" @change="handlegameceChange">
                        <a-select-option v-for="province in game" :key="province">{{province}}</a-select-option>
                    </a-select>
                </div>
                <div class="game_select" style="margin-left:30px">
                    科目：
                    <a-select v-model="secondCity" style="width: 250px" @change="handlegameItemceChange">
                        <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
                    </a-select>
                </div>
                <a-button style="margin-left:10px" @click="click({key:'skb'})" icon=search type="primary">查询</a-button>
                <!-- <a-button style="margin-left:10px" @click="uploadMould" type="primary">下载批次模板</a-button> -->
            </div>
            <div class="drawLoats_cont">
                <div class="drawLoats_cont_navigation">
                    <a-menu
                        v-model="current"
                        mode="horizontal"
                        @click="click"
                    >
                        <!-- <a-menu-item key="cq">抽签</a-menu-item> -->
                        <!-- <a-menu-item key="pcb" >出发批次表</a-menu-item> -->
                        <a-menu-item key="skb" >成绩表</a-menu-item>
                    </a-menu>
                </div>
                <div v-show="selectNavigation=='cq'" class="group_list" :style="{'height':contHeight-280+'px'}">
                    <div class="group_item" v-for="(item,index) in drawLoatsData" :key="index">
                        <div class="group_item_head">
                            <h4 class="group_item_name">{{item.groupName}}</h4>
                            <div class="group_item_time">
                                出发时间：{{item.startTime}}
                                <!-- <a-date-picker
                                    :defaultValue="moment(item.startTime, 'YYYY-MM-DD HH-mm-ss')"
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder="Select Time"
                                    @change="onChange"
                                    @ok="onOk"
                                    class="date_set"
                                /> --><br/>
                                出发间隔：{{item.spacingTime}} s
                                <!-- <a-time-picker disabled   :open.sync="open">
                                    <a-button slot="addon" size="small" type="primary" @click="handleClose">Ok</a-button>
                                </a-time-picker> -->
                            </div>
                            <div class="group_item_operate">
                                <p>
                                    <!-- 出发时段统计：
                                    <span>09:00--11:20</span> -->
                                </p>
                                <p @click="controlDetail(index)">{{item.isShow?'收起':'展开'}}</p>
                                <span style="display:none">{{showDetail}}</span>
                            </div>
                        </div>
                        <div v-show="item.isShow" class="group_item_detail">
                            <div class="group_item_detail_cao" v-for="(positionItem,positionIndex) in item.position" :key="positionIndex">
                                <p class="group_item_detail_name">{{positionItem.name}}</p>
                                <div class="group_item_detail_title">
                                    <p>ID</p>
                                    <p>姓名</p>
                                    <p>单位</p>
                                    <!-- <p>序号</p> -->
                                </div>
                                <ul class="group_item_detail_list">
                                    <li v-for="(sportsmanItem,sportsmanIndex) in positionItem.sportsman" :key="sportsmanIndex">
                                        <p>{{sportsmanItem.identityCard}}</p>
                                        <p>{{sportsmanItem.name}}</p>
                                        <p>{{sportsmanItem.nationality}}</p>
                                        <!-- <p>{{sportsmanItem.age}}</p> -->
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="noData" v-if="drawLoatsData.length==0">请先选择项目和科目！</div>
                </div>
                <div v-show="selectNavigation=='pcb'" class="pcb" :style="{'height':contHeight-280+'px'}">
                    <div class="pcb_item" id="pcbPrint">
                        <div class="pcb_name">出发批次表</div>
                        <div class="pcb_list" v-for="(item,index) in pcbList" :key="index">
                            <div class="pcb_title">{{item.batchName}} {{item.startTime.substring(11,19)}}</div>
                            <ul style="list-style:none">
                                <li v-for="(manitem,manindex) in item.sportsmanList" :key="manindex" style="list-style:none">
                                    <span style="display:inline-block;min-width:150px">{{manitem.batchIndex}}</span>
                                    <span style="display:inline-block;min-width:150px">{{manitem.name}}</span>
                                    <!-- <span style="display:inline-block;min-width:150px">{{manitem.nationality}}</span> -->
                                    <span style="display:inline-block;min-width:150px">{{manitem.groupName}}</span>
                                    <span style="display:inline-block;min-width:150px">{{manitem.no}}</span>
                                    <span style="display:inline-block;min-width:150px">{{manitem.gpsNo}}</span>
                                    <span style="display:inline-block;min-width:150px">{{manitem.fingerCardNo}}</span>
                                </li>
                            </ul>
                        </div>
                        <div v-if="pcbList.length==0" style="line-height:50px">暂无数据！</div>
                    </div>
                </div>
                <div v-show="selectNavigation=='skb'" class="skb" :style="{'height':contHeight-280+'px'}">
                    <div class="skb_item" v-for="(item,key,index) in skbList" :key="index" :id="'skb'+index" style="page-break-before:always ">
                        <div class="skb_name">{{key}}</div>
                        <div class="skb_item_table">
                            <!-- <div class="skb_item_name">出发时刻表</div> -->
                            <div class="skb_item_title">
                                <span style="display:inline-block;min-width:150px;text-align:center">时间</span>
                                <span style="display:inline-block;min-width:150px;text-align:center">姓名</span>
                                <span style="display:inline-block;min-width:150px;text-align:center">组别</span>
                                <span style="display:inline-block;min-width:150px;text-align:center">卫星</span>
                                <span style="display:inline-block;min-width:150px;text-align:center">成绩</span>
                                <!-- <span style="display:inline-block;min-width:150px;text-align:center">索引</span> -->
                            </div>
                            <ul style="list-style:none">
                                <li  v-for="(groupItem,groupIndex) in item" :key="groupIndex" style="list-style:none">
                                    <span style="display:inline-block;min-width:150px;">{{groupItem.startTime.substring(11,19)}}</span>
                                    <span style="display:inline-block;min-width:150px;">{{groupItem.name}}</span>
                                    <span style="display:inline-block;min-width:150px;">{{groupItem.groupName}}</span>
                                    <span style="display:inline-block;min-width:150px;">{{groupItem.gpsNo}}</span>
                                    <span style="display:inline-block;min-width:150px;">{{groupItem.fingerCardNo}}</span>
                                    <!-- <span style="display:inline-block;min-width:150px;">{{groupItem.batchIndex}}</span> -->
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-if="Object.keys(skbList).length==0">暂无数据！</div>
                </div>
            </div>
            <!-- <div class="operate_btn">
                <a-button type="primary" @click="operateBth(selectNavigation)">{{selectNavigation=='cq'?'抽签':'打印'}}</a-button>
                <a-button style="margin-left:10px" @click="cleanDrawloat" type="primary">清除抽签结果</a-button>
                <a-upload style="margin-left:10px" :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
                    <a-button type="primary" :loading="uploading"> 导入抽签结果 </a-button>
                </a-upload>
            </div> -->
        </a-spin>
    </div>
</template>
<script>
import moment from 'moment'
import { findAllCompetition, findEntity, findGroupAndChild, drawLots, findEntityList, selectListByCompetition, clearDrawLots } from '@/api'
import axios from '@/utils/request.js'
export default {
    data () {
        return {
            uploading: false, // 导入抽签结果loading
            spinning: false, // loading
            gameList: {}, // 项目列表
            gameItemList: {}, // 科目列表
            pcbList: [], // 出发批次表
            skbList: {}, // 出发时刻表
            game: [
                '请选择'
            ],
            gameItem: {
                请选择: ['请选择']
            },
            cities: null, // 项目
            secondCity: null, // 科目
            current: ['skb'], // 当前选择的导航
            selectNavigation: 'skb', // 选择的导航
            open: false,
            showDetail: false,
            currentGame: '', // 当前选择的项目名称
            currentGameId: '', // 当前选择的项目Id
            currentGameItemId: '', // 当前选择的科目Id
            drawLoatsData: [], // 抽签数据
            loadingText: '',
            autowindHeight: '',
            fileList: [] // 文件数组
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
        moment,
        handleRemove (file) { // 删除文件
            const index = this.fileList.indexOf(file)
            const newFileList = this.fileList.slice()
            newFileList.splice(index, 1)
            this.fileList = newFileList
        },
        beforeUpload (file) { // 导入抽签结果
            this.fileList = [...this.fileList, file]
            const { fileList } = this
            const formData = new FormData()
            fileList.forEach((file) => {
                formData.append('file', file)
            })
            formData.append('competitionId', this.currentGameId)
            formData.append('competitionItemId', this.currentGameItemId)
            // console.log(formData)
            this.uploading = true
            axios({
                url: 'along/CrossSportsmanController/uploadSportsBatch',
                method: 'post',
                processData: false,
                data: formData
            }).then(res => {
                // console.log(res)
                if (res.status == 1) {
                    this.$message.success('导入成功', 1)
                    this.uploading = false
                    this.getAllData(this.currentGameId, this.currentGameItemId)
                    this.fileList = []
                }
            }).catch(err => {
                alert('上传失败')
                this.fileList = []
                this.uploading = false
            })
        },
        leadOut () { // 导出文件
            if (this.currentGameId) {
                let url = process.env.BASE_URL + 'along/CrossSportsmanController/exportLotsExcel?competitionId=' + this.currentGameId + '&competitionItemId=' + this.currentGameItemId
                window.location.href = url
            } else {
                alert('请先选择项目科目！')
            }
        },
        uploadMould () { // 下载批次模板
            let url = process.env.BASE_URL + 'along/CrossCompetitionItemsController/downloadBatchStart'
            window.location.href = url
        },
        cleanDrawloat () { // 清除抽签结果
            if (this.currentGameId) {
                this.$tips.confirm('是否确认清除抽签结果？').then((res) => {
                    clearDrawLots(this.currentGameId, this.currentGameItemId).then(res => {
                        console.log(res)
                        if (res.status == 1) {
                            alert('清除成功！')
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                alert('请先选择项目科目！')
            }
        },
        uploadDrawloat () { // 导入抽签结果
            if (this.currentGameId) {
                this.$tips.confirm('是否确认导入抽签结果？').then((res) => {

                 }).catch((err) => {
                    console.log(err)
                })
            } else {
                alert('请先选择项目科目！')
            }
        },
        handlegameceChange (value) { // 项目科目选择
            if (value !== '请选择') {
                this.cities = this.gameItem[value]
                this.secondCity = this.gameItem[value][0]
                this.currentGame = value // 项目名称
                this.currentGameId = this.gameList[value] // 项目id
                this.currentGameItemId = this.gameItemList[value][this.secondCity] // 科目id
                this.selectNavigation = 'skb'
                this.current[0] = 'skb'
                this.getAllData(this.currentGameId, this.currentGameItemId)
            }
        },
        handlegameItemceChange (value) { // 项目科目选择
            this.current[0] = 'skb'
            this.selectNavigation = 'skb'
            this.currentGameItemId = this.gameItemList[this.currentGame][value] // 科目id
            this.getAllData(this.currentGameId, this.currentGameItemId)
        },
        click (item) { // 导航切换
            if (item.key == 'cq') { // 抽签
                this.selectNavigation = item.key
            } else if (item.key == 'pcb') { // 出发批次表
                if (this.currentGameId && this.currentGameItemId) {
                    this.loadingText = '数据加载中，请稍等！'
                    this.spinning = true
                    this.selectNavigation = item.key
                    this.pcbList = []
                    findEntityList(this.currentGameId, this.currentGameItemId).then(res => {
                        console.log(res)
                        this.spinning = false
                        let data = res
                        if (data.status == 1) {
                            data.data.forEach((item, idex) => {
                                item.startTime = this.$formatDate(item.startTime)
                                this.pcbList.push(item)
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                        this.spinning = false
                    })
                } else {
                    // alert('请先选择项目科目')
                }
            } else { // 出发时刻表
                 if (this.currentGameId && this.currentGameItemId) {
                    this.loadingText = '数据加载中，请稍等！'
                    this.spinning = true
                    this.selectNavigation = item.key
                    this.skbList = {}
                    selectListByCompetition(this.currentGameId, this.currentGameItemId).then(res => {
                        console.log(res)
                        this.spinning = false
                        let data = res
                        if (data.status == 1) {
                            data.data.forEach((item, index) => {
                                if (!this.skbList[item.nationality]) {
                                    this.skbList[item.nationality] = []
                                }
                                this.skbList[item.nationality].push({
                                    groupName: item.groupName,
                                    startTime: this.$formatDate(item.startTime),
                                    name: item.name,
                                    batchIndex: item.batchIndex,
                                    gpsNo: item.gpsNo,
                                    fingerCardNo: item.fingerCardNo
                                })
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                        this.spinning = false
                    })
                 } else {
                    // alert('请先选择项目科目')
                 }
            }
        },
        onChange (value, dateString) { // 日期选择
            console.log('Selected Time: ', value)
            console.log('Formatted Selected Time: ', dateString)
        },
        onOk (value) { // 日期选择
            console.log('onOk: ', value)
        },
        handleClose () { // 时间选择
            this.open = false
        },
        controlDetail (index) { // 展示抽签详情
            this.$set(this.drawLoatsData[index], 'isShow', !this.drawLoatsData[index].isShow)
            this.showDetail = !this.showDetail
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
                            if (res.status == 1) {
                                let gameDetail = res.data
                                this.gameItem[gameDetail.name] = []
                                this.gameItemList[gameDetail.name] = {}
                                gameDetail.competitionItem.forEach(ele => {
                                    if (ele.type != 2) {
                                        this.gameItem[gameDetail.name].push(ele.itemName)
                                        this.gameItemList[gameDetail.name][ele.itemName] = ele.id
                                    }
                                })
                            }
                        })
                    })
                }
            })
        },
        getAllData (competitionId, competitionItemId) { // 获取所有抽签前的数据结果集
            this.drawLoatsData = []
            this.spinning = true
            findGroupAndChild(competitionId, competitionItemId).then(res => {
                console.log(res)
                let data = res
                if (data.status == 1) {
                    this.drawLoatsData = data.data
                    this.drawLoatsData.forEach(item => {
                        item.isShow = false
                    })
                    this.spinning = false
                }
            }).catch(err => {
                this.spinning = false
                console.log(err)
            })
        },
        operateBth (type) { // 下方操作按钮--抽签/打印
            if (type == 'cq') { // 抽签
                this.$tips.confirm('是否确认抽签？').then((res) => {
                    if (this.currentGameId && this.currentGameItemId) {
                        this.spinning = true
                        this.loadingText = '抽签生成中,此过程可能较慢，请耐心等候！'
                        drawLots(this.currentGameId, this.currentGameItemId).then(res => {
                            let data = res
                            if (data.status == 1) {
                                // 抽签成功，跳到批次表
                                this.pcbList = []
                                findEntityList(this.currentGameId, this.currentGameItemId).then(res => {
                                    this.selectNavigation = 'pcb'
                                    this.current[0] = 'pcb'
                                    let data = res
                                    if (data.status == 1) {
                                        this.pcbList = data.data
                                    }
                                    this.spinning = false
                                }).catch(err => {
                                    console.log(err)
                                    this.spinning = false
                                })
                            } else {
                                this.spinning = false
                            }
                        }).catch(err => {
                            console.log(err)
                            alert('网络请求错误，请稍后重试')
                            this.spinning = false
                        })
                    } else {
                        alert('请先选择项目科目')
                    }
                }).catch((err) => {
                    console.log(err)
                })
            } else if (type == 'pcb') { // 批次表
                let newWin = window.open('') // 新打开一个空窗口
                newWin.document.write(document.getElementById('pcbPrint').outerHTML) // 将图片添加进新的窗口
                newWin.document.close() // 在IE浏览器中使用必须添加这一句
                newWin.focus() // 在IE浏览器中使用必须添加这一句
                setTimeout(function () {
                    newWin.print() // 打印
                    newWin.close() // 关闭窗口
                }, 100)
            } else {
                var newWin = window.open('') // 新打开一个空窗口
                Object.keys(this.skbList).forEach((item, index) => {
                    var imageToPrint = document.getElementById('skb' + index) // 将要被打印的图片
                    newWin.document.write(imageToPrint.outerHTML) // 将图片添加进新的窗口
                })
                newWin.document.close() // 在IE浏览器中使用必须添加这一句
                newWin.focus() // 在IE浏览器中使用必须添加这一句
                setTimeout(function () {
                    newWin.print() // 打印
                    newWin.close() // 关闭窗口
                }, 100)
            }
        }
    }
}
</script>
<style lang="scss">
    p{
        margin-bottom: 0
    }
    ul{
        margin-bottom: 0
    }
    .drawLoats_head{
        background-color: #E2F2FF;
        height: 40px;
        display: flex;
        align-items: center;
        .game_select{
            margin-left: 60px
        }
    }
    .drawLoats_cont{
        padding: 0 30px;
        .drawLoats_cont_navigation{
            padding: 0 30px;
            text-align: left
        }
        .group_list{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            // height: 400px;
            overflow-y: auto;
            padding-top: 20px;
            align-items:flex-start;
            .group_item{
                width: 48%;
                border: 1px solid #DDDDDD;
                margin-bottom: 20px;
                .group_item_head{
                    padding: 15px;
                    text-align: left;
                    color: #666;
                    .group_item_name{
                        color: #666;
                        font-weight: 700
                    }
                    .group_item_operate{
                        display: flex;
                        justify-content: space-between;
                        span{
                            font-weight: 700
                        }
                        p:nth-child(2){
                            color: #387EE8;
                            cursor: pointer;
                        }
                    }
                    .group_item_time{
                        margin: 10px 0;
                        .date_set{
                            margin-right: 10px
                        }
                    }
                }
                .group_item_detail{
                    .group_item_detail_name{
                        background-color: #F7FBFF;
                        text-align: left;
                        padding:0 20px;
                        line-height: 30px;
                        color: #666;
                        font-weight: 700;
                    }
                    .group_item_detail_title{
                        display: flex;
                        justify-content: space-around;
                        border-top: 1px solid #DDD;
                        line-height: 30px;
                        color: #333;
                        p{
                            flex: 1;
                            text-align: center;
                        }
                    }
                    .group_item_detail_list{
                        li{
                            display: flex;
                            justify-content: space-around;
                            border-top: 1px solid #DDD;
                            line-height: 30px;
                            color: #666;
                            p{
                                flex: 1;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
        .pcb{
            overflow-y: auto;
            padding-top: 20px;
            .pcb_item{
                border: 1px solid #DDDDDD;
                // width: 750px;
                .pcb_name{
                    font-size: 18px;
                    font-weight: 700;
                    padding: 10px;
                }
                .pcb_list{
                    color: #666;
                    .pcb_title{
                        font-weight: 700;
                        padding-left: 20px;
                        line-height: 30px;
                        color: #333;
                        display: flex;
                        align-items: center;
                        border-top: 1px solid #DDD;
                        background: #F7FBFF;
                    }
                    ul{
                        li{
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            span{
                                flex: 1;
                                text-align: left;
                                border-top: 1px solid #DDD;
                                padding-left: 20px;
                                line-height: 30px
                            }
                        }
                    }
                }
            }
        }
        .skb{
            overflow-y: auto;
            padding-top: 20px;
            .skb_item{
                margin-bottom: 10px;
                .skb_name{
                    text-align: left;
                    font-weight: bold;
                }
                .skb_item_table{
                    border: 1px solid #DDD;
                    width: 750px;
                    margin-top: 12px;
                    .skb_item_name{
                        padding: 10px;
                        font-size: 18px;
                        font-weight: 700
                    }
                    .skb_item_title{
                        display: flex;
                        align-items: center;
                        line-height: 30px;
                        justify-content: space-around;
                        color:#333;
                        font-weight: 700;
                        border-top: 1px solid #DDD;
                    }
                    ul{
                        li{
                            color: #666;
                            display: flex;
                            align-items: center;
                            line-height: 30px;
                            justify-content: space-around;
                            border-top: 1px solid #DDD;
                            span{
                                flex: 1;
                                text-align: center
                            }
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
        bottom: -80px;
        left: 0;
        right: 0
    }
    .noData{
        margin: 0 auto;
        margin-top: 100px;
        text-align: center
    }
    @media print {
                .pcb_item{
                    border: 1px solid #DDDDDD;
                    width: 750px;
                    .pcb_name{
                        font-size: 18px;
                        font-weight: 700;
                        padding: 10px;
                    }
                    .pcb_list{
                        color: #666;
                        .pcb_title{
                            font-weight: 700;
                            padding-left: 20px;
                            line-height: 30px;
                            color: #333;
                            display: flex;
                            align-items: center;
                            border-top: 1px solid #DDD;
                            background: #F7FBFF;
                        }
                        ul{
                            li{
                                display: flex;
                                align-items: center;
                                justify-content: space-around;
                                span{
                                    flex: 1;
                                    text-align: left;
                                    border-top: 1px solid #DDD;
                                    padding-left: 20px;
                                    line-height: 30px
                                }
                            }
                        }
                    }
                }
            }
</style>
