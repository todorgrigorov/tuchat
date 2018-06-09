import React, { Component } from 'react'
import { Icon, Text, Tile } from 'react-native-elements';

import papers from '../../../../assets/images/papers.png';

const config = {
    HEADER_HEIGHT: 300
};

export default class FeedHeaderBackground extends Component {
    render() {
        return (
            <Tile
                height={config.HEADER_HEIGHT}
                imageSrc={papers}
                activeOpacity={1}
                featured />
        )
    }
}
