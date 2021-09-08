var repoclientinfodata = {
    client: {},
    clientID: null,
    dates: null,
    repoClientID: null,
    repoID: null,
    repositoryList: {},

};

const state = {
    repoclientdata: { ...repoclientinfodata },
};

const getters = {

};

const mutations = {
    setrepoclientInfo(state, repoclientdata) {
        state.repoclientdata = repoclientdata;
    },
    resetrepoclientInfo(state) {
        state.repoclientdata = { ...repoclientinfodata };
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
