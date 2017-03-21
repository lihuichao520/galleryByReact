import React from 'react'

// 图片组件
class ImgFigure extends React.Component {


		// 点击事件处理器，翻转图片
		handleClick(e) {

			if (this.props.arrange.isCenter) {
				this.props.inverse();
			} else {
				this.props.center();
			}

			e.stopPropagation();
			e.preventDefault();


		}

		render() {

			var styleObj = {};

			// 如果props属性中指定了这张图片的位置，则使用
			if (this.props.arrange.pos) {
				styleObj = this.props.arrange.pos;
			}

			// 如果图片的旋转角度有值并且不为0，则添加旋转角度,浏览器前缀（驼峰式）
			if (this.props.arrange.rotate) {
				(['MozTransform', 'msTransform', 'WebkitTransform', 'OTransform', 'transform']).map((item) => {
					styleObj[item] = 'rotate(' + this.props.arrange.rotate + 'deg';
				});
			}

			// 调整z-index，避免其他图片遮盖到中心图片
			if (this.props.arrange.isCenter) {
				styleObj.zIndex = 11;
			}
			var imgFigureClassName = "img-figure";
			imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

			return (
				<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick.bind(this)}>
                    <img src={this.props.data.imageURL} 
                         alt={this.props.data.title}/>
                    <figcaption>
                       <h2 className="img-title">{this.props.data.title}</h2> 
                       <div className="img-back">
                          <p>
                             {this.props.data.desc}
                          </p>
                       </div>                 
                    </figcaption>
            </figure>
			);
		}
	} //end ImgFigure

export default ImgFigure;