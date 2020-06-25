import React , {Component} from 'react';
import {View} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class CarouselSlider extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeIndex:0,
		}
	}
  render() {
		return (
			<View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
        <Carousel
          layout={'default'} layoutCardOffset={9}
          ref={ref => this.carousel = ref}
          data={this.props.articlesData}
          sliderWidth={this.props.SLIDER_WIDTH}
          itemWidth={this.props.ITEM_WIDTH}
          renderItem={this.props._renderItem}
          onSnapToItem = { index => this.setState({activeIndex:index}) }
				/>
      </View>
		);
	}
}