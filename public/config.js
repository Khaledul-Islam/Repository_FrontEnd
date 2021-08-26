import { URL, ServicePath } from "./configURL";

const CoreAPIGatewatyAPI = {
    URL: URL.CoreAPIGatewatyURL,
};

const CoreSecurityAPI = {
    URL: URL.CoreSecurityURL,
    LOGIN_PATH: "/Security/DoLogin",
    LOGOUT_PATH: "/Security/DoLogout",
    ServicePath: ServicePath.CoreSecurityPath,
};
const CoreGLAPI = {
    ServicePath: ServicePath.CoreGLPath,
    URL: URL.CoreGLURL,
};

const RepositoryAPI = {
    ServicePath: ServicePath.RepositoryPath,
    URL: URL.RepositoryURL,
};

export {
    RepositoryAPI,
};