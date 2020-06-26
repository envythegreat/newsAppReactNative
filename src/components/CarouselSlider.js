import React , {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
			<>
				<View>
					<Text style={styles.news}>{this.props.Title}</Text>
				</View>
				<View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
					<Carousel
						layout={'default'} layoutCardOffset={9}
						ref={ref => this.carousel = ref}
						data={this.props.articlesData}
						sliderWidth={this.props.SLIDER_WIDTH}
						itemWidth={this.props.ITEM_WIDTH}
						renderItem={this.props._renderItem}
						onSnapToItem = { index => this.setState({activeIndex:index}) }
						loop
					/>
				</View>
			</>
		);
	}
}
const styles = StyleSheet.create({
  news: {
    color: "#000",
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 10
  }
});