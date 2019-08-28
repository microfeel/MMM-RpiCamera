/* global Module */

/* Magic Mirror
 * Module: MMM-RpiCamera
 *
 * By menxin @ https://microfeel.net
 * MIT Licensed.
 */

Module.register('MMM-RpiCamera',{

	// Define properties
	defaults: {
		inDebugMode:false,
		debugInfo:"",
		autoRecognition:true,
		// timespan of camera cut photo
		timespan:5000,
		persons:[],
		//cloud parameters
		secretId:"qcloudsecretid",
		secretKey:"qcloudsecretkey",
		secretId:"qcloudsecretid",

	},

	// Define required translations.
	getTranslations: function() {
		return {
			en: "translations/en.json",
			de: "translations/de.json",
			es: "translations/es.json",
			zh: "translations/zh.json",
			nl: "translations/nl.json",
			sv: "translations/sv.json",
			fr: "translations/fr.json",
			id: "translations/id.json"
		};
	},

	// UiDom
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = debugInfo;
		return wrapper;
	},

	getScripts:function(){
		return ['moment.js'];
	},

	// A notification arrived
	notificationReceived: function(notification, payload, sender) {
	},
	
	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
	},

	start: function() {
		Log.info('Starting module: ' + this.name);
	},

});