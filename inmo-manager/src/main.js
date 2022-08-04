import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import {
    Button,
    Select,
    DatePicker,
    Container,
    Menu,
    MenuItem,
    MenuItemGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Avatar,
    Dialog,
    Form,
    FormItem,
    Input,
    Option,
    Row,
    Col,
    Upload,
    Message,
    MessageBox
} from 'element-ui';

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Container),
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Avatar)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')