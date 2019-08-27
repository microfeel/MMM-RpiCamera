/* global Module */

/* Magic Mirror
 * Module: MMM-RpiCamera
 *
 * By menxin @ http://microfeel.net
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

	// A notification arrived
	notificationReceived: function(notification, payload, sender) {
	},
	
	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
	},

	start: function() {
		Log.info('Starting module: ' + this.name);
		initCamera();
		initCloudConnection();
		camera.spy();
	},

	// shotnap camera image
	spy:function(timespan){
		camera.start();
	},

	// init PICamera
	initCamera:function(){

		var RaspiCam = require("raspicam");
		var camera = new RaspiCam({
			mode: "photo",
			output: "./photo/snap-"+date().getTime()+".jpg",
			encoding: "jpg",
			timeout: 0 // take the picture immediately
		});
	
		//listen for the "start" event triggered when the start method has been successfully initiated
		camera.on("start", function () {
			//compare photo,if not found add lib
		});

		//listen for the "read" event triggered when each new photo/video is saved
		camera.on("read", function (err, timestamp, filename) {
			//do stuff
		});

		//listen for the "stop" event triggered when the stop method was called
		camera.on("stop", function () {
			//do stuff
		});

		//listen for the process to exit when the timeout has been reached
		camera.on("exit", function () {
			//do stuff
		});

		debugInfo = "Camera inited!";
		Log.info(debugInfo);
	},

	// init qcloud connection
	initCloudConnection:function(secretId,secretKey,region){
		const tencentcloud = require("../../../../tencentcloud-sdk-nodejs");

		// Load iai models
		const IaiClient = tencentcloud.iai.v20180301.Client;
		const models = tencentcloud.iai.v20180301.Models;
		
		const Credential = tencentcloud.common.Credential;
		
		let cred = new Credential(secretId, secretKey);
		let client = new IaiClient(cred, region);
		
		// 实例化一个请求对象
		let req = new models.DescribeZonesRequest();
		
		// 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
		client.DescribeZones(req, function(err, response) {
			// 请求异常返回，打印异常信息
			if (err) {
				console.log(err);
				return;
			}
			// 请求正常返回，打印response对象
			console.log(response.to_json_string());
		});
	}

});