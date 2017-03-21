import React from 'react'

// 导航控制组件
class ControllerUnit extends React.Component {

	// 处理点击事件
	handleClick(e) {

		// 如果点击的是当前正在选中态的按钮，则翻转图片,否则居中
		if (this.props.arrange.isCenter) {
			this.props.inverse();
		} else {
			this.props.center();
		}


		e.preventDefault();
		e.stopPropagation();
	}
	render() {

		var controllerUnitClassName = "controller-unit";

		// 如果对应的是居中的图片，显示按钮的居中态
		if (this.props.arrange.isCenter) {
			controllerUnitClassName += " is-center";
			// 如果同时对应的是翻转图片，显示控制按钮的翻转态
			if (this.props.arrange.isInverse) {
				controllerUnitClassName += " is-inverse";
			}
		}
		return (
			<span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
		);
	}
}

export default ControllerUnit;