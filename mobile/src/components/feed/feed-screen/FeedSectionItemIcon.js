import React, { Component } from 'react'

import UserIcon from '../../common/user-icon';

const config = {
};

export default class FeedSectionItem extends Component {
    state = {
    }

    render() {
        return (
            <UserIcon size={40} photoId={this.props.photoId} />
        )
    }
}
