/* Magic Mirror
 * Node Helper: RpiCamera
 *
 * By menxin @ microfeel.net
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var RaspiCam = require("./raspicam/lib/raspicam");
var camera = new RaspiCam({
  mode: "photo",
  output: "./photo/snap-" + Date.now() + ".jpg",
  encoding: "jpg",
  timeout: 10000, // take the picture immediately
  preview:"560,240,800,600",
  rotation:"180"
});

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
		console.log("Starting module in subclass: " + this.name);
		this.initCamera();
		//initCloudConnection();
		this.spy();
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
	},

	// init PICamera
	initCamera:function(){
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
		console.log(debugInfo);
	},

	// shotnap camera image
	spy:function(timespan){
		camera.start();
  },
  
  preview:function(time){

  },

  snap:function(){

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