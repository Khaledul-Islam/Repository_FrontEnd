var handoverinfodata = {
    assignDate: null,
    assignFrom: null,
    devID: null,
    developer: {},
    id: null,
    isFirstAssign: null,
    newDate: null,
    newDev: null,
    prevDev: null,
    repoID: null,
    repositoryList: {},

};

const state = {
    handoverdata: { ...handoverinfodata },
};

const getters = {

};

const mutations = {
    sethandoverInfo(state, handoverdata) {
        state.handoverdata = handoverdata;
    },
    resethandoverInfo(state) {
        state.handoverdata = { ...handoverinfodata };
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
