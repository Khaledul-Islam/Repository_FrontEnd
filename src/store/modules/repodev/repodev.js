var repodevinfodata = {
    assignDate: null,
    assignFrom: null,
    devID: null,
    developer: {},
    id: null,
    isFirstAssign: null,
    repoID: null,
    repositoryList: {},

};

const state = {
    repodevdata: { ...repodevinfodata },
};

const getters = {

};

const mutations = {
    setrepodevInfo(state, repodevdata) {
        state.repodevdata = repodevdata;
    },
    resetrepoclientInfo(state) {
        state.repodevdata = { ...repodevinfodata };
    },

};

const actions = {

};

export default {
    state,
    getters,
    actions,
    mutations,
};
