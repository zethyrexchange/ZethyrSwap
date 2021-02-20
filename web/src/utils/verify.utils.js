export default  {
    isMainNet(fullNode) {
        let mainNet = process.env.NETWORK_ALLOW_LIST;
        if(mainNet.includes(fullNode)) return true;
        return false;
    }
}