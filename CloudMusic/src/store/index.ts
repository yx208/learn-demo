import { createStore } from 'vuex'
import { TabType } from "../components/Navbar/index.vue"
import { TopbarRule } from '../types/common'
import { StoreState } from '../types/store'
import mTypes from "./mutation.types"

function state(): StoreState {
    return {
        showTopbarBg: true,
        topbarRule: {
            type: TabType.DISCOVER,
            showCenter: true,
            showRight: true
        }
    }
}

const store = createStore({
    state,
    mutations: {
        [mTypes.SET_SHOW_TOPBAR_BG](state, value: boolean) {
            state.showTopbarBg = value
        },
        [mTypes.SET_TOPBAR_RULE](state, rule: TopbarRule) {
            console.log('commit')
            state.topbarRule = rule
        },
        setTopbarRuleItem<T extends keyof TopbarRule>(
            state: StoreState,
            params: { key: T, value: TopbarRule[T] }
        ) {
            state.topbarRule[params.key] = params.value
        }
    }
})

export default store
