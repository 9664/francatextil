import {ImageResponse} from 'next/og';
export const alt='Expo Franca Têxtil Summit 2026';
export const size={width:1200,height:630};
export const contentType='image/png';
const line=(color,rotate,left,top)=><div style={{position:'absolute',width:92,height:13,background:color,transform:`rotate(${rotate}deg)`,left,top,borderRadius:3}}/>;
export default function Image(){return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',background:'linear-gradient(135deg,#020526 0%,#06104b 62%,#160737 100%)',color:'white',position:'relative',overflow:'hidden',fontFamily:'Arial'}}>
<div style={{position:'absolute',right:-80,top:-40,width:420,height:420,border:'2px solid #00C8FF',borderRadius:'50%',opacity:.18}}/><div style={{position:'absolute',right:-20,top:10,width:420,height:420,border:'2px solid #FF168A',borderRadius:'50%',opacity:.18}}/>
<div style={{display:'flex',flexDirection:'column',padding:'58px 70px',width:'100%'}}>
<div style={{position:'relative',width:138,height:104,display:'flex',marginBottom:18}}>{line('#00C8FF',42,12,20)}{line('#FF168A',42,38,20)}{line('#FFD500',42,12,52)}{line('#1677FF',-42,12,20)}{line('#FF168A',-42,38,20)}{line('#FFD500',-42,12,52)}</div>
<div style={{fontSize:42,fontWeight:900,color:'#FFD500',letterSpacing:2}}>EXPO</div><div style={{fontSize:88,fontWeight:900,letterSpacing:-3,lineHeight:.95}}>FRANCA TÊXTIL</div><div style={{fontSize:45,fontWeight:900,color:'#FFD500',marginTop:8}}>SUMMIT 2026</div>
<div style={{display:'flex',gap:28,alignItems:'center',marginTop:42,fontSize:31,fontWeight:800}}><span style={{color:'#FFD500'}}>16 E 17 DE SETEMBRO</span><span>·</span><span>FRANCA/SP</span></div>
<div style={{fontSize:22,color:'#c9d2ed',marginTop:24,letterSpacing:1}}>INDÚSTRIA · MODA · TECNOLOGIA · NEGÓCIOS</div><div style={{fontSize:20,color:'#aab6d9',marginTop:10}}>A nova economia têxtil encontra Franca.</div>
</div><div style={{position:'absolute',left:0,right:0,bottom:0,height:10,display:'flex'}}><div style={{flex:1,background:'#00C8FF'}}/><div style={{flex:1,background:'#FF168A'}}/><div style={{flex:1,background:'#FFD500'}}/></div></div>,size)}
