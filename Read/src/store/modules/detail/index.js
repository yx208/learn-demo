import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
	listenVisible: true,
	catelogVisible: true
}

const detail = {
	state,
	getters,
	mutations,
	actions
}

export default detail

