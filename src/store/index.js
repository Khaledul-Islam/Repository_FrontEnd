import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './modules/auth.module';
import ClientsInfoData from './modules/clients/clients';
import DevelopersInfoData from './modules/developers/developers';
import RepositoryInfoData from './modules/repositories/repositories';
import RepoClientInfoData from './modules/repoclient/repoclient';
import RepoDevInfoData from './modules/repodev/repodev';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    ClientsInfoData,
    DevelopersInfoData,
    RepositoryInfoData,
    RepoClientInfoData,
    RepoDevInfoData,
  },
})
