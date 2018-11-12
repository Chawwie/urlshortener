import React from 'react'
import {Segment, Container, Menu, Header, Icon, Button} from 'semantic-ui-react'

const PageHeader = function() {
  return (
    <Segment textAlign='center' vertical >
      <Menu style={{ padding: '0em 0em', border:'none' }} inverted secondary size='small' >
        <Container>
          <Menu.Item as='a'>
            <Header as='h3' >
              <Icon name='compress' />
              <Header.Content>URL Shortener</Header.Content>
            </Header>
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  );
}

export default PageHeader;