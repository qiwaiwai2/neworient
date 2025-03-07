import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import Tips from '@/utils/dialog.js'
import Print from 'vue-print-nb'
import { formatDate } from '@/utils/utils'
import {
  Button,
  Layout,
  Breadcrumb,
  Menu,
  Icon,
  Input,
  Table,
  Modal,
  Select,
  DatePicker,
  TimePicker,
  Collapse,
  Spin,
  Upload,
  Checkbox,
  Pagination,
  message,
  InputNumber,
  Row,
  Col
} from 'ant-design-vue'
Vue.use(Print)
Vue.prototype.$tips = Tips
Vue.prototype.$formatDate = formatDate
Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Layout)
Vue.use(Breadcrumb)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Table)
Vue.use(Modal)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Collapse)
Vue.use(Spin)
Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(Pagination)
Vue.use(message)
Vue.use(InputNumber)
Vue.prototype.$message = message
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
