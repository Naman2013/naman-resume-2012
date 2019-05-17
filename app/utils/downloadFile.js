import axios from 'axios';

function downloadFile(url, fileName) {
  return axios({
    url,
    method: 'GET',
    responseType: 'blob',
    crossdomain: true,
    withCredentials: false,
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  });
}

export { downloadFile };
