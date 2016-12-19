export default function (url,path,progress,success,errHandler){
    const fileTransfer = new FileTransfer();
    fileTransfer.onprogress =progressEvent =>
        progress(progressEvent.loaded / progressEvent.total) //获取已下载和总大小的比例

    fileTransfer.download( //调用对象的下载方法，开始下载
        url,
        cordova.file.externalRootDirectory+'leo_music/'+path,
        function(entry) {
            console.log("download complete: " + entry.fullPath);//下载完成后调用方法
            success(entry)
        },
        function(error) {  //出错回调函数
            alert('err',error)
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
            errHandler(error)
        },
        false,
        {
            headers: {

            }
        }
    );
}