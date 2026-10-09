import type {CSSProperties} from 'react';
import {AbsoluteFill, Composition, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

type BarProps = {label: string; value: number; color: string; style?: CSSProperties};
const BarInner = ({label, value, color, style}: BarProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = interpolate(frame, [0, 1.5 * fps], [0, 1], {easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <Interactive.Div style={{position:'absolute', bottom:0, width:148, height:560, fontFamily:'Arial, sans-serif', ...style}}>
    <div style={{position:'absolute', bottom:value * 4.6 * progress + 20, width:'100%', textAlign:'center', fontSize:48, fontWeight:700, color:'#f1f6ff', opacity:interpolate(frame,[0,0.25*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>{Math.round(value * progress)}</div>
    <div style={{position:'absolute',bottom:0,width:'100%',height:value*4.6,background:`linear-gradient(180deg, ${color}, ${color}88)`,borderRadius:'18px 18px 0 0',transformOrigin:'bottom',scale:interpolate(frame,[0,1.5*fps],[0,1],{easing:Easing.bezier(0.16,1,0.3,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'}),boxShadow:`0 0 45px ${color}18`}} />
    <div style={{position:'absolute',bottom:-66,width:'100%',textAlign:'center',fontSize:36,color:'#a3b1c9'}}>{label}</div>
  </Interactive.Div>;
};
const Bar = Interactive.withSchema({Component:BarInner,componentName:'<Bar>',wrapInSequence:true,schema:{label:{type:'text-content',default:'A',description:'Label'},value:{type:'number',default:35,min:0,max:100,hiddenFromList:false,description:'Value'},color:{type:'color',default:'#55dcc4',description:'Bar color'}}});

export const Chart = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background:'#0b1120',color:'#f1f6ff',fontFamily:'Arial, sans-serif'}}>
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 80% 25%, #21385077, transparent 65%)'}} />
    <Interactive.Div name="Heading" premountFor={fps} style={{position:'absolute',left:130,top:100,fontSize:96,fontWeight:700,letterSpacing:-4,opacity:interpolate(frame,[0,0.6*fps],[0,1],{extrapolateRight:'clamp'})}}>Five steps forward.</Interactive.Div>
    <Interactive.Div name="Subtitle" premountFor={fps} style={{position:'absolute',left:136,top:224,fontSize:38,color:'#93a3bb'}}>A simple comparison · illustrative data</Interactive.Div>
    <div style={{position:'absolute',left:235,right:135,top:350,height:460}}>
      {[0,25,50,75,100].map(tick=><div key={tick} style={{position:'absolute',left:0,right:0,bottom:tick*4.6,borderTop:'1px solid #ffffff15'}}><span style={{position:'absolute',left:-94,top:-17,fontSize:28,color:'#677993'}}>{tick}</span></div>)}
      <Bar name="Bar A" from={0.5*fps} premountFor={fps} label="A" value={35} color="#459dbb" style={{left:65}} />
      <Bar name="Bar B" from={0.75*fps} premountFor={fps} label="B" value={52} color="#48b6c0" style={{left:365}} />
      <Bar name="Bar C" from={1*fps} premountFor={fps} label="C" value={68} color="#50cdc4" style={{left:665}} />
      <Bar name="Bar D" from={1.25*fps} premountFor={fps} label="D" value={81} color="#78dfba" style={{left:965}} />
      <Bar name="Bar E" from={1.5*fps} premountFor={fps} label="E" value={95} color="#c8f296" style={{left:1265}} />
    </div>
    <Interactive.Div name="Footer" premountFor={fps} style={{position:'absolute',left:136,bottom:100,fontSize:26,letterSpacing:4,color:'#657892'}}>FIVE CATEGORIES / ONE CLEAR VIEW</Interactive.Div>
  </AbsoluteFill>;
};
export const MyComposition = () => <Composition id="FiveBars" component={Chart} width={1920} height={1080} fps={30} durationInFrames={180} />;
