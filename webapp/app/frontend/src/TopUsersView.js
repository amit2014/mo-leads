import Immutable from 'immutable'
import React from 'react'

import Avatar from 'material-ui/Avatar'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import {List, ListItem} from 'material-ui/List'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Subheader from 'material-ui/Subheader'


const dummyImagesList = new Immutable.List([
    'adellecharles-128.jpg',
    'adhamdannaway-128.jpg',
    'allisongrayce-128.jpg',
    'angelceballos-128.jpg',
    'chexee-128.jpg',
    'jsa-128.jpg',
    'kerem-128.jpg',
    'kolage-128.jpg',
    'ok-128.jpg',
    'raquelromanp-128.jpg',
    'uxceo-128.jpg'
])


class TopUsersView extends React.Component {
    static propTypes = {
        onClickUser: React.PropTypes.func.isRequired,
        onUnselectUser: React.PropTypes.func.isRequired,
        selectedUserName: React.PropTypes.string.isRequired,
        topUsers: React.PropTypes.object.isRequired
    }

    render() {
        if (this.props.topUsers.isEmpty()) {
            return null
        }

        let dummyList = dummyImagesList
        const topUsersListItems = this.props.topUsers.map((count, userName) => {
            const dummyIndex = Math.floor(Math.random() * dummyList.count())
            const dummyImageName = dummyList.get(dummyIndex)
            dummyList = dummyList.delete(dummyIndex)
            const avatarImageSrc = `static/images/${dummyImageName}`

            const unselectButton = (userName === this.props.selectedUserName) ? (
                <IconButton onClick={this.onUnselectUser} >
                    <NavigationClose />
                </IconButton>
            ) : null

            return (
                <ListItem
                    key={userName}
                    leftAvatar={<Avatar src={avatarImageSrc} />}
                    onClick={this.onClickUser.bind(this, userName)}
                    primaryText={userName}
                    rightIconButton={unselectButton}
                    secondaryText={`${count} payments`}
                />
            )
        }).take(10).valueSeq()

        const topUsersList = (
            <List>
                {topUsersListItems}
            </List>
        )

        return (
            <Card initiallyExpanded={true} >
                <CardHeader
                    actAsExpander={true}
                    showExpandableButton={true}
                    title="Most active leads"
                />
                <CardText expandable={true} >
                    {topUsersList}
                </CardText>
            </Card>
        )
    }

    onClickUser = (userName) => {
        this.props.onClickUser(userName)
    }

    onUnselectUser = (event) => {
        event.stopPropagation()
        this.props.onUnselectUser()
    }
}

export default TopUsersView
