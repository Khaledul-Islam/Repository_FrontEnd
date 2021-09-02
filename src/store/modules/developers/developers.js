var developerinfodata = {
    developerID: null,
    developerName: null,

};

const state = {
    developerdata: { ...developerinfodata },
};

const getters = {

};

const mutations = {
    setdeveloperInfo(state, developerdata) {
        state.developerdata = developerdata;
    },
    resetdeveloperInfo(state) {
        state.developerdata = { ...developerinfodata };
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
