import Vue from 'vue'
const vm = new Vue()
var app = true
app = window._cordovaNative?true:false;
var booted = false
const notifyResolver = {}
var fileExists = function (path) {
    window.FileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file read...");
            readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file read: " + e.toString());
        };

        // If we are appending data to file, go to the end of the file.
        if (isAppend) {
            try {
                fileWriter.seek(fileWriter.length);
            }
            catch (e) {
                console.log("file doesn't exist!");
            }
        }
        fileWriter.write(dataObj);
    });
}
const call = {
    setStatusColor(color){
        //alert(StatusBar.backgroundColorByHexString)
        StatusBar.backgroundColorByHexString(color);
    },
    
    toggleWebView(v){
        StatusBar.overlaysWebView(v)
    },
    download(url,path,progress,success,errHandler){
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
    },
    notify(title,text,handler,args=[],id){
        function test(){
            try{
                1/0;
            }catch (e){
                console.log(e)
                return false
            }
        }
        id = id ||new Date().getTime()
        plugin.notification.local.schedule(
            {
                id:id,
                title : title,
                text:text,
                data:{handler,args},
                at:new Date(),
            },
        )
    },
    addNotifyResolver(name,fn){
        //return
        notifyResolver[name] = fn

    },
    socialShare(){
        plugins.socialsharing.share(...arguments);
    }
}
const fake = {}
for (let item in call){
    fake[item] =(function () {
        const name = item
        return  function () {
            var str = 'call native : '+name+': '
            Array.prototype.slice.call(arguments).forEach(arg=>str+='['+arg.toString()+']')
            alert(str)
            return false
        }
    })();
}
const agent = {}
for (let item in call){
    agent[item] = (function () {
        const name = item
        return function () {
            if(!booted){
                alert('native plugin not booted')
                return false
            }
            return call[name](...Array.prototype.slice.call(arguments))
        }
    })()
}

//boot init
export const  native = app?agent:fake
export const promise = new Promise(function (resolve,reject) {
    app&&setTimeout(function () {
        var i = 0;
        const boot = function(){
            try {
                i++
                window.plugin.notification.local.on("click", function(notification) {
                    //alert('call handler')
                    const data = JSON.parse(notification.data)
                    setTimeout(function () {
                        notifyResolver[data.handler](...data.args)
                    },0)
                });
                plugin.backgroundMode.enable()
                booted = true
                resolve()
            }catch (e){
                if(i>10){
                    vm.$messagebox('native plugin boot error,try to reboot the application')
                    reject()
                    return
                }
                vm.$toast('try to boot for'+i+'times')
                setTimeout(boot,1000)

            }
        }
        boot()
    },2000)

})


