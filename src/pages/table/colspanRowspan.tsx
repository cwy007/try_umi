import { Table, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
const { Paragraph, Text, Link } = Typography;

// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };

  if (index === 4) {
    obj.props.colSpan = 0; // 第五行时单元格不显示
  }

  return obj;
};

const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    // render 方法的返回值有两种
    // 1. React.ReactNode
    // 2. RenderedCell
    render: (text, row, index) => {
      if (index < 4) {
        return <a>{text}</a>;
      }
      // export interface RenderedCell<RecordType> {
      //   props?: CellType<RecordType>;
      //   children?: React.ReactNode;
      // }
      return {
        children: <a>{text}</a>,
        props: {
          colSpan: 5, // 单元格属性
        },
      };
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    render: renderContent,
  },
  {
    title: 'Home phone',
    colSpan: 2, // 配置表头：占据2列
    dataIndex: 'tel',
    // 配置表格：render 中
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === 2) {
        obj.props.rowSpan = 2; // 第3行的这个单元格占据2行
      }
      // These two are merged into above cell
      if (index === 3) {
        obj.props.rowSpan = 0; // 为0时，单元格不渲染
      }
      if (index === 4) {
        obj.props.colSpan = 0; // 为0时，单元格不渲染
      }
      return obj;
    },
  },
  {
    title: 'Phone',
    colSpan: 0, // 配置表头：不显示
    dataIndex: 'phone',
    render: renderContent,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: renderContent,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
  },
];

const colspanRowspan = () => {
  return (
    <div>
      <Table
        // 列描述
        columns={columns}
        // 配置展开属性
        expandable={{
          // 额外的展开行
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          // 设置是否允许行展开
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        // 数据数组
        dataSource={data}
        bordered
      />
      <Typography>
        <Paragraph>
          表头只支持列合并，使用 column 里的 colSpan 进行设置。
          <br />
          表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan
          设值为 0 时，设置的表格不会渲染。
        </Paragraph>
      </Typography>
    </div>
  );
};

colspanRowspan.title = '表格行/列合并';
export default colspanRowspan;
