import { Upload, Icon, Modal } from 'antd';
import './index.less';
import { connect } from 'umi';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class ModGoodPic extends React.Component {
  componentDidMount() {
    this.setState({
      fileList: this.props.imgs,
      uploadList3: this.props.uploadImg,
    });
  }
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    imgList: [],
    uploadList: [],
    uploadList3: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  beforeUpload = () => {
    return true;
  };
  handleChange = ({ fileList }) => {
    this.setState({ fileList }, () => {
      this.setState(
        {
          uploadList: [
            ...this.state.uploadList,
            this.state.fileList[this.state.fileList.length - 1]?.response,
          ],
        },
        () => {
          let uploadList2 = JSON.parse(JSON.stringify(this.state.uploadList));
          for (let i = 0; i < uploadList2.length; i++) {
            if (uploadList2[i] === null) {
              uploadList2.splice(i, 1);
              i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位
            }
          }
          let newArr = [];
          uploadList2.forEach((item) => {
            item.forEach((item) => {
              newArr.push(item);
            });
          });
          this.setState({ uploadList3: [...this.state.uploadList3, ...newArr] }, () => {
            this.props.dispatch({
              type: 'goodList/saveuploadList3',
              payload: this.state.uploadList3,
            });
          });
        },
      );
    });
  };
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <div style={{ fontSize: '20px' }}>+</div>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const headers = {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYmRlYmQyNGVjMWFkODBkZTJlMDA2NGJjNDdkNzNlYmZhY2ZmZGJiZmYxMjRlOWE0MDJmOGJkMGJiOGU5Y2VjMjVjM2E1MTYyMjA2YjE5MmYiLCJpYXQiOjE2MDkyNTQ3NDgsIm5iZiI6MTYwOTI1NDc0OCwiZXhwIjoxNjQwNzkwNzQ4LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.HwHEfvnzBZhGRFOigRW_6zKzMuylG1rGMT1xvjvXxw9J33sJtJ-NLtwQw2t7sxkc-p9TDLbovqgcMiROLZXnaJMTdJ7oZAq_sp6Wv6r6apZQ5WNnspDZ6vNYxk7hSMM1iOP48NTntTwmzRaYf5-ePGyt9_WM05IIzlqkyym6fWh49AEilpZIRTler8seaceRwC8J6SQ21g9okE5NKFPtmhehIT23fn-yyMpnKvJYi2_xv4e9zqRIO2rk8urbUgf66hAyHJfsE2LOZfVAWg-vUE2d_S-kbU-qAswgtBs5iQ5jp6dqODQ4gmhfecriFKYsIhdkR2iFakhBHQo6dHw5BM42gwepGkCStXEDXn6G2zqC6cJqBuVVLaFJ4DLnY4PaGjDf08NCy6HV8wo6HnypAQS9_Y9jHjEAIGE37LBRKD0bdQehUyqccbj25U75ZkT6iq6S3oZ0bt3AEwR-OigybN3pO4z4Kd4H-i5s_bQIL-vu3eJsub8z6fhN9uS0XsX65oB6RprTx4leTSis1qMbaJ7DXzsAk1o7oWBW2rrRCwe2TWplN2FUXqbrhI1_AtjkrxEQ1IaLWRk3fzv6pFC-Q8T7WthwX3VDvUiS2_U2CQVWMxSfxR74h2Dgy5CwASE2fWJbgbFtSMKwK5xFR1tzVtfIoOsaVfLtu6Jnhmbxsw8',
    };
    return (
      <div className="clearfix">
        <Upload
          action="/api/admin/attachments?format=object"
          name="files[]"
          listType="picture-card"
          disabled={false}
          headers={headers}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
          accept=".jepg,.jpg,.png,.gif"
          multiple
        >
          {fileList.length >= 30 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = ({ goodList }) => {
  return {
    imgs: goodList.imgs,
    uploadImg: goodList.uploadImg,
  };
};
export default connect(mapStateToProps)(ModGoodPic);
