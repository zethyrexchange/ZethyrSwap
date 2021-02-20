const MyMixpanel = {
	setMixpanelTrack(type, params) {
        let hasTronWeb = typeof(window.tronWeb) === 'undefined' ? false : true;
        params.hasTronWeb = hasTronWeb;
        mixpanel.track(type, params);
    }
};
export default MyMixpanel;