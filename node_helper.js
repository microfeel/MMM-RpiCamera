/* Magic Mirror
 * Node Helper: RpiCamera
 *
 * By menxin @ microfeel.net
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
const PiCamera = require('./pi-camera'); 
const camera = new PiCamera({
	mode: 'photo',
	output: "./photo/snap-" + Date.now() + ".jpg",
	rotation:180,
	timeout:5000,
	// opacity:220,
	preview:"560,240,800,600"
  });

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
		console.log("Starting module in subclass: " + this.name);
		//initCloudConnection();
		this.spy();
	},

	// shotnap camera image
	spy:function(timespan){
		camera.snap()
		.then((result) => {
			// Your picture was captured
		})
		.catch((error) => {
			console.error(error);
		});
		// camera.start();
	},

	preview:function(time){
		//todo:

	},

	// init qcloud connection
	initCloudConnection:function(secretId,secretKey,region){
		const tencentcloud = require("tencentcloud-sdk-nodejs");

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