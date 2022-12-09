import React, {useState} from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import styles from "../common/CardStyle";

// core components
import { GridContainer, GridItem, TabPanel } from '../common';
import SentReferral from '../dashboard/SentReferral';
import ReceiveReferral from '../dashboard/ReceiveReferral';

const useStyles = makeStyles(styles);


export default function CompletedPage() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
              <Tab label="Sent" id="simple-tab-0" className={selectedTab === 0 ? classes.blue:null}/>
              <Tab label="Received" id="simple-tab-1" className={selectedTab === 1 ? classes.blue:null}/>
          </Tabs>
          <TabPanel value={selectedTab} index={0}>
                <SentReferral tableHeaderName={'Completed Referrals'} status={"completed"}/>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <ReceiveReferral tableHeaderName={'Completed Referrals'} status={"completed"}/>
            </TabPanel>
        </GridItem>

      </GridContainer>
    </div>
  );
};
