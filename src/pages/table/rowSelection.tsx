import { Tabs } from 'antd';
import BasicRowSelection from './components/BasicRowSelection';
import SpecialRowSelection from './components/SpecialRowSelection';

const { TabPane } = Tabs;

function callback(key: string) {
  console.log(key);
}

const RowSelection = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="BasicRowSelection" key="1">
      <BasicRowSelection />
    </TabPane>
    <TabPane tab="SpecialRowSelection" key="2">
      <SpecialRowSelection />
    </TabPane>
  </Tabs>
);

RowSelection.title = 'RowSelection';
export default RowSelection;
