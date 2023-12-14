const state = {
    formModalStatus: false,
    editModalStatus: false
};

const mutations = {
    setFormModalStatus(state, value) {
        state.formModalStatus = value;
    },
    setEditModalStatus(state, value) {
        state.editModalStatus = value;
    },
};

const actions = {
    async openFormModal({ commit }, open) {
        commit('setFormModalStatus', open);
    },
    async closeFormModal({ commit }) {
        commit('setFormModalStatus', false);
    },
    async openEditModal({ commit }, open) {
        commit('setEditModalStatus', open);
    },
    async closeEditModal({ commit }) {
        commit('setEditModalStatus', false);
    },
};

const getters = {
    formModalStatus: state => state.formModalStatus,
    editModalStatus: state => state.editModalStatus
};

export default {
    state,
    mutations,
    actions,
    getters,
};
