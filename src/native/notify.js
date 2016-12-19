const notifyResolver = {}

export function addNotifyResolver(name,fn){
                                  //return
                                  notifyResolver[name] = fn

                              }


export function notify(title,text,handler,args=[],id){
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
                   }

export function bootNotify(){
    window.plugin.notification.local.on("click", function(notification) {
                        //alert('call handler')
                        const data = JSON.parse(notification.data)
                        setTimeout(function () {
                            notifyResolver[data.handler](...data.args)
                        },0)
                    });
}