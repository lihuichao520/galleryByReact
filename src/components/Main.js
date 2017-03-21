require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';
import ReactDOM from 'react-dom'
import ImgFigure from './ImgFigures'
import ControllerUnit from './ControllerUnit'


// 获取保存图片相关信息的数据
var imageDatas = require('../data/imageDatas.json');
window.console.log(imageDatas);
// 利用自执行函数，将图片信息转换成图片的URL路径信息
imageDatas = (function generImageURL(imageDatasArr) {

	for (var i = 0, j = imageDatasArr.length; i < j; i++) {

		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDatasArr[i] = singleImageData;
	}

	return imageDatasArr;

})(imageDatas);



class AppComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			imgsArrangeArr: [
				//  {
				// // 	pos: {
				// // 		left: 0,
				// // 		top: 0
				// // 	},
				// // 	rotate: 0 //旋转角度
				// //isInverse:false   //图片是否反转
				// //isCenter:false    //图片是否居中
				// // }
			]

		};

		this.Constant = {
			centerPos: {
				left: 0,
				right: 0
			},
			hPosRange: { //水平方向的取值范围
				leftSecX: [0, 0],
				rightSecX: [0, 0],
				y: [0, 0]
			},
			vPosRange: { //垂直方向的取值范围
				x: [0, 0],
				topY: [0, 0]
			}
		};
	}

	// 通过map函数进行映射，把每一项转化为一个组件，初始化ImgFigure
	// renderImgFigure() {

	// 	return imageDatas.map((imageDatas, index) => {

	// 		if (!this.state.imgsArrangeArr[index]) {
	// 			this.state.imgsArrangeArr[index] = {
	// 				pos: {
	// 					left: 0,
	// 					top: 0
	// 				},
	// 				rotate: 0,
	// 				isInverse: false,
	// 				isCenter: false
	// 			}
	// 		}

	// 		return (
	// 			<ImgFigure data={imageDatas} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>
	// 		);
	// 	});
	// }

	render() {

		var imgFigures = [];
		var controllerUnits = [];

		// 初始化ImgFigure和ControllerUnit
		imageDatas.map((imageDatas, index) => {

			if (!this.state.imgsArrangeArr[index]) {
				this.state.imgsArrangeArr[index] = {
					pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false,
					isCenter: false
				}
			}

			imgFigures.push(
				<ImgFigure key={index} data={imageDatas} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>
			);
			controllerUnits.push(
				<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>

			);
		});

		return (
			<section className="stage" ref="stage">
            	<section className="img-sec">
               		{imgFigures}
            	</section>
            	<nav className="controller-nav">
            	     {controllerUnits}
                </nav>
     	    </section>
		);
	}

	// 组件加载以后，为每张图片计算其位置的范围（初始化Constant）
	componentDidMount() {

		// 拿到整个舞台大小
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.floor(stageW / 2),
			halfStageH = Math.floor(stageH / 2);

		// 拿到一个imageFigure的大小
		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.floor(imgW / 2),
			halfImgH = Math.floor(imgH / 2);

		// 计算中心图片的位置点
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}

		// 计算左侧、右侧区域图片排布位置的取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		// 上侧区域的取值范围
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageW;

		// 排布图片
		this.rearrange(0);
	}

	/* 在取值范围之内布局我们的图片
	 * @param centerIndex 指定居中排布那个图片
	 */
	rearrange(centerIndex) {
		var imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constant;

		// 图片位置的取值范围
		var centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecx = hPosRange.leftSecX,
			hPosRangeRightSecx = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x;



		// 中间图片的布局 首先居中centerIndex指定的图片
		var imgsArrangeCenterArr = [];
		imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
		imgsArrangeCenterArr[0].pos = centerPos;
		imgsArrangeCenterArr[0].rotate = 0;
		imgsArrangeCenterArr[0].isCenter = true;

		// 取出要布局上侧的图片的状态信息
		var imgsArrangeTopArr = [];
		var topImgNum = Math.floor(Math.random() * 2);
		var topImgSpliceIndex = 0;
		topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));

		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

		// 布局位于上侧的图片
		imgsArrangeTopArr.forEach(function(value, index) {
			imgsArrangeTopArr[index] = {
				pos: {
					top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
					left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
				},
				rotate: get30DegRandom(),
				isCenter: false
			};
		});

		// 布局两侧的图片
		for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {

			var hPosRangeLORX = null;
			// 前半部分布局左边
			// 右半部分布局右边
			if (i < k) {
				hPosRangeLORX = hPosRangeLeftSecx;
			} else {
				hPosRangeLORX = hPosRangeRightSecx;
			}

			imgsArrangeArr[i] = {
				pos: {
					top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
					left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
				},
				rotate: get30DegRandom(),
				isCenter: false
			};
		}

		if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
			imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
		}

		imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

		this.setState({
			imgsArrangeArr: imgsArrangeArr
		});
	}

	/*
	 *翻转图片
	 *@param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
	 *@return {function} 输出一个闭包函数，该闭包函数内return一个真正的待被执行的函数
	 */
	inverse(index) {
		return function() {
			var imgsArrangeArr = this.state.imgsArrangeArr;

			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			});
		}.bind(this); //闭包函数的this对象具有全局性，在此用bind指定this
	}

	/*
	 *利用闭包函数，居中对应index的图片
	 *@param index, 需要被居中的图片对应的在图片信息数组中的下标
	 *@return {function}
	 */
	center(index) {
		return function() {
			this.rearrange(index);
		}.bind(this);
	}

}

// 获取区间内的一个随机值
function getRangeRandom(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}
// 获取0-30度之间的任意一个正负值
function get30DegRandom() {
	return ((Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30));
}
AppComponent.defaultProps = {};


export default AppComponent;