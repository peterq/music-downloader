const colorArray = []
const stage = [0,51,102,153,204,255]
for(let i=0;i<216;i++){
    let b = i%6
    let g = (i-b)/6%6
    let r = (i-b-6*g)/36
    colorArray.push('rgb('+stage[r]+','+stage[g]+','+stage[b]+')')
}
console.log('generate the colors',colorArray.length)
export default colorArray