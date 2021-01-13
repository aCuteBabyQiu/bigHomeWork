import { Upload, Icon, Modal } from 'antd';
import './index.less';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class AddSortPic extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    imgList: [],
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
      // this.setState(
      //   {
      //     imgList: this.state.imgList.push(
      //       this.state.fileList[this.state.fileList.length - 1]?.response[0],
      //     ),
      //   },
      //   () => {
      //     console.log(this.state.imgList);
      //   },
      // );
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
          headers={headers}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.beforeUpload}
          accept=".jepg,.jpg,.png,.gif"
          multiple
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default AddSortPic;
