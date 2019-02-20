import React from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button
} from 'framework7-react';

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar sliding={false}>
      <NavTitle sliding>Pomodoro App</NavTitle>
    </Navbar>

    {/* Page content */}
    <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem title="Lorem ipsum" />
    </List>

    <Block>
      <Row tag="p">
        <Col tag="span">
          <Button large fill raised>Start</Button>
        </Col>
        <Col tag="span">
          <Button large fill raised>Reset</Button>
        </Col>
      </Row>
    </Block>
  </Page>
);

export default HomePage;
