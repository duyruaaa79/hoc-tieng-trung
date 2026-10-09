// Chạy: NODE_PATH=<thư mục có node_modules/jsdom> node tests/smoke.js
const fs=require("fs"),path=require("path"),{JSDOM,VirtualConsole}=require("jsdom");
const root=path.join(__dirname,"..");let fail=0;const ok=(c,m)=>{console.log((c?"OK   ":"FAIL ")+m);if(!c)fail++};
const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
const L=JSON.parse(fs.readFileSync(path.join(root,"lessons.json"),"utf8"));
ok((L.lessons||L).length===48,"lessons.json hợp lệ, "+(L.lessons||L).length+" bài");
const errs=[],net=[];const vc=new VirtualConsole();vc.on("jsdomError",e=>errs.push(String(e.message||e)));vc.on("error",e=>errs.push(String(e)));
const dom=new JSDOM(html,{runScripts:"dangerously",pretendToBeVisual:true,url:"https://x.test/",virtualConsole:vc,beforeParse(w){
  w.speechSynthesis={getVoices:()=>[],cancel(){},speak(){},pause(){},resume(){},speaking:false,onvoiceschanged:null,addEventListener(){}};
  w.SpeechSynthesisUtterance=function(t){this.text=t};
  w.fetch=(...a)=>{net.push(String(a[0]));return Promise.reject(new Error("offline"))};
  w.XMLHttpRequest=function(){net.push("xhr")};w.navigator.sendBeacon=()=>{net.push("beacon")};
  w.addEventListener("error",e=>errs.push("win:"+(e.message||e)));}});
const w=dom.window;
setTimeout(()=>{
  ok(errs.length===0,"0 lỗi khi nạp"+(errs.length?": "+errs.slice(0,3).join(" | "):""));
  const m=/const APP_VER="([^"]+)"/.exec(html);ok(!!m,"APP_VER "+(m&&m[1]));
  if(w.USE){
    w.go("vocab");w.go("drill");w.go("home");w.sheet("set");w.sheet(null);
    const r=w.USE.report();ok(r.id&&r.days&&Object.keys(r.days).length===1,"báo cáo có mã và 1 ngày");
    const j=JSON.stringify(r);ok(!/[一-鿿]/.test(j),"báo cáo không chứa chữ Hán");
    const d=Object.values(r.days)[0];ok(d.s>=1&&d.v.vocab>=1&&d.v.drill>=1,"đếm phiên và màn: "+JSON.stringify(d.v));
    w.USE.open();ok(!!w.document.getElementById("useView"),"màn thống kê mở được");
    w.document.getElementById("useOn").checked=false;w.document.getElementById("useOn").dispatchEvent(new w.Event("change",{bubbles:true}));
    const gv=()=>Object.values(w.USE.report().days)[0].v.vocab,n0=gv();w.go("vocab");ok(gv()===n0,"tắt đo thì không đếm thêm");
    w.document.getElementById("useX").click();ok(!w.document.getElementById("useView"),"đóng được");
  }
  const nn=net.filter(x=>x!=="lessons.json");ok(nn.length===0,"không gọi mạng mới"+(nn.length?": "+nn.join(","):""));
  const sc=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
  sc.forEach((s,i)=>{try{new Function(s)}catch(e){ok(false,"cú pháp khối "+i+": "+e.message)}});ok(true,sc.length+" khối script qua kiểm tra cú pháp");
  console.log(fail?"CÓ LỖI":"ĐẠT");process.exit(fail?1:0)},1500);
