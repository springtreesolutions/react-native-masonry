import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import Injector from 'react-native-injectable-component';


export default class Brick extends Component {
  el = null;

  render() {
    let props = this.props;
    const image = _getImageTag(props, props.gutter);
    const footer = (props.renderFooter) ? props.renderFooter(props.data) : null;
    const header = (props.renderHeader) ? props.renderHeader(props.data) : null;
    const onPressHandler = props.onPress ? props.onPress : () => { };

    return (
      <TouchableHighlight
        underlayColor="transparent"
        ref={container => this.el = container}
        onPress={(e) => { onPressHandler({ event: e, data: props.data, ref: this.el, image }) }
        }>
        <View key={props.brickKey}>
          {header}
          <View ref={props.onImageRef}>{image}</View>
          {footer}
        </View>
      </TouchableHighlight>
    );
  }
}

// _getImageTag :: Image, Gutter -> ImageTag
export function _getImageTag (props, gutter = 0) {
  const imageProps = {
    key: props.uri,
    source: {
      uri: props.uri
    },
    resizeMethod: 'auto',
    style: {
      width: props.width,
      height: props.height,
      marginTop: gutter,
      ...props.imageContainerStyle,
    }
  };

  return (
    <Injector
      defaultComponent={Image}
      defaultProps={imageProps}
      injectant={props.customImageComponent}
      injectantProps={props.customImageProps} />
  )
}

// _getTouchableUnit :: Image, Number -> TouchableTag
export function _getTouchableUnit (image, gutter = 0) {
  return (
    <TouchableHighlight
      key={image.uri}>
      <View>
        { _getImageTag(image, gutter) }
      </View>
    </TouchableHighlight>
  );
}
