var clientinfodata = {
    clientID: null,
    client_Name: null,

};

const state = {
    clientdata: { ...clientinfodata },
};

const getters = {

};

const mutations = {
    setClientInfo(state, clientdata) {
        state.clientdata = clientdata;
    },
    resetClientInfo(state) {
        state.clientdata = { ...clientinfodata };
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
