var repositoryinfodata = {
    "comments": null,
    "createDate": null,
    "id": null,
    "lastUpdate": null,
    "repoType": null,
    "repositoryName": null,
    "toolsTech": null,
    "url": null,

};

const state = {
    repositorydata: { ...repositoryinfodata },
};

const getters = {

};

const mutations = {
    setrepositoryInfo(state, repositorydata) {
        state.repositorydata = repositorydata;
    },
    resetrepositoryInfo(state) {
        state.repositorydata = { ...repositoryinfodata };
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
