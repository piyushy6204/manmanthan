import math, random
from playwright.sync_api import sync_playwright
from PIL import Image

PAL = {
 'forest': ['#0a4a3b','#1d6552','#4a8a72'],
 'deep':   ['#052f26','#0b4a3b','#226552'],
 'sage':   ['#86a08a','#a9bba8','#cfdccb'],
 'gold':   ['#b5832d','#d4a653','#ecd29c'],
 'pale':   ['#d9b66a','#ecd29c','#f6e8c6'],
}
def defs(dark=False):
    g=''
    for k,c in PAL.items():
        g+=f'<linearGradient id="g_{k}" x1="0" y1="0.5" x2="1" y2="0.5"><stop offset="0" stop-color="{c[0]}"/><stop offset="0.55" stop-color="{c[1]}"/><stop offset="1" stop-color="{c[2]}"/></linearGradient>'
    return f'''<defs>{g}
<filter id="wc" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="4" result="n1"/>
  <feDisplacementMap in="SourceGraphic" in2="n1" scale="9" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="11" result="n2"/>
  <feColorMatrix in="n2" type="matrix" values="0.30 0 0 0 0.80  0.30 0 0 0 0.80  0.30 0 0 0 0.80  0 0 0 0 1" result="m"/>
  <feComposite in="d" in2="m" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
</filter>
<filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="22"/></filter>
<filter id="brush" x="-10%" y="-10%" width="120%" height="120%">
  <feTurbulence type="fractalNoise" baseFrequency="0.02 0.006" numOctaves="1" seed="2" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="6"/>
  <feColorMatrix type="matrix" values="0 0 0 0 {'1' if dark else '0.25'}  0 0 0 0 {'1' if dark else '0.22'}  0 0 0 0 {'1' if dark else '0.15'}  0 0 0 {'0.05' if dark else '0.10'} 0"/></filter>
</defs>'''

def leaf(x,y,ang,L,W,key,op=0.92,rnd=None):
    a=rnd.uniform(-0.12,0.12)*W
    d=f"M0 0 C {L*.22:.1f} {-W*(1+a/W):.1f} {L*.68:.1f} {-W*.85:.1f} {L:.1f} 0 C {L*.68:.1f} {W*.85:.1f} {L*.22:.1f} {W:.1f} 0 0Z"
    vein=f"M{L*.04:.1f} 0 L{L*.9:.1f} 0"
    hl=f"M0 0 C {L*.22:.1f} {-W:.1f} {L*.68:.1f} {-W*.85:.1f} {L:.1f} 0 C {L*.6:.1f} {-W*.25:.1f} {L*.25:.1f} {-W*.15:.1f} 0 0Z"
    return (f'<g transform="translate({x:.1f} {y:.1f}) rotate({ang:.1f})" opacity="{op}">'
            f'<path d="{d}" fill="url(#g_{key})"/><path d="{hl}" fill="#fff" opacity="0.13"/>'
            f'<path d="{vein}" stroke="#fff" stroke-opacity="0.38" stroke-width="{max(1,L/110):.1f}" fill="none"/></g>')

def bez(p,t):
    (x0,y0),(x1,y1),(x2,y2),(x3,y3)=p; u=1-t
    x=u**3*x0+3*u*u*t*x1+3*u*t*t*x2+t**3*x3; y=u**3*y0+3*u*u*t*y1+3*u*t*t*y2+t**3*y3
    dx=3*u*u*(x1-x0)+6*u*t*(x2-x1)+3*t*t*(x3-x2); dy=3*u*u*(y1-y0)+6*u*t*(y2-y1)+3*t*t*(y3-y2)
    return x,y,math.degrees(math.atan2(dy,dx))

def branch(p,n,L0,L1,spread,mix,rnd,stem='#0b4a3b',stem_op=0.7,tip=True):
    out=f'<path d="M{p[0][0]} {p[0][1]} C {p[1][0]} {p[1][1]} {p[2][0]} {p[2][1]} {p[3][0]} {p[3][1]}" stroke="{stem}" stroke-opacity="{stem_op}" stroke-width="3.2" fill="none" stroke-linecap="round"/>'
    keys=[k for k,w in mix for _ in range(w)]
    for i in range(n):
        t=0.08+0.88*i/(n-1); x,y,a=bez(p,t); s=L0+(L1-L0)*t
        for side in (-1,1):
            k=rnd.choice(keys); L=s*rnd.uniform(.85,1.12)
            out+=leaf(x,y,a+side*rnd.uniform(spread-10,spread+14),L,L*rnd.uniform(.26,.34),k,rnd.uniform(.82,.95),rnd)
    if tip:
        x,y,a=bez(p,1); out+=leaf(x,y,a,L1*1.1,L1*.3,rnd.choice(keys),.92,rnd)
    return out

def scatter(n,box,rnd,mix,Lr=(50,95)):
    keys=[k for k,w in mix for _ in range(w)]; out=''
    for _ in range(n):
        x=rnd.uniform(box[0],box[2]); y=rnd.uniform(box[1],box[3]); L=rnd.uniform(*Lr)
        out+=leaf(x,y,rnd.uniform(-180,180),L,L*.3,rnd.choice(keys),rnd.uniform(.6,.9),rnd)
    return out

def arc(cx,cy,r,a0,a1,w,color,op):
    p0=(cx+r*math.cos(math.radians(a0)),cy+r*math.sin(math.radians(a0))); p1=(cx+r*math.cos(math.radians(a1)),cy+r*math.sin(math.radians(a1)))
    large=1 if (a1-a0)%360>180 else 0
    return f'<path d="M{p0[0]:.1f} {p0[1]:.1f} A {r} {r} 0 {large} 1 {p1[0]:.1f} {p1[1]:.1f}" stroke="{color}" stroke-opacity="{op}" stroke-width="{w}" fill="none" stroke-linecap="round" filter="url(#brush)"/>'

def svg(W,H,body,dark=False):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">{defs(dark)}{body}<rect width="{W}" height="{H}" filter="url(#grain)"/></svg>'

def render(s,W,H,out):
    with sync_playwright() as p:
        b=p.chromium.launch(); pg=b.new_page(viewport={'width':W,'height':H})
        pg.set_content(f'<body style="margin:0;background:#fff">{s}</body>'); pg.wait_for_timeout(400)
        pg.screenshot(path='/tmp/art/_t.png'); b.close()
    Image.open('/tmp/art/_t.png').convert('RGB').save(out,quality=86,optimize=True)

# ---------- A. Intro banner (light) 2400x560
def intro():
    W,H=2400,560; r=random.Random(5)
    body=f'<rect width="{W}" height="{H}" fill="#f6f2e6"/>'
    body+=f'<rect width="{W}" height="{H}" fill="url(#skyA)"/>'
    body=body.replace('<rect width="2400" height="560" fill="url(#skyA)"/>','')
    sun=f'<g filter="url(#soft)"><circle cx="1620" cy="270" r="190" fill="#e9c97f" opacity="0.55"/></g><g filter="url(#soft)"><circle cx="1620" cy="270" r="120" fill="#f3dca0" opacity="0.7"/></g>'
    wash=f'<g filter="url(#soft)" opacity="0.5"><ellipse cx="500" cy="470" rx="620" ry="120" fill="#a9bba8"/><ellipse cx="2000" cy="500" rx="520" ry="90" fill="#cfdccb"/></g>'
    body+=wash+sun
    body+=arc(1620,280,250,150,330,14,'#c99a45',.65)+arc(1620,280,262,200,300,4,'#c99a45',.5)
    mixA=[('forest',4),('deep',1),('sage',3),('gold',2)]
    g=branch([(-60,520),(380,540),(700,230),(1180,330)],11,150,95,48,mixA,r)
    g+=branch([(-40,300),(300,120),(620,170),(980,70)],9,120,80,50,mixA,r,tip=True)
    g+=branch([(2460,540),(2100,470),(1900,540),(1560,500)],10,140,90,46,[('forest',3),('sage',2),('gold',3),('pale',1)],r)
    g+=scatter(14,(1250,40,2300,500),r,[('gold',4),('forest',2),('pale',2)],(36,72))
    body+=f'<g filter="url(#wc)">{g}</g>'
    return svg(W,H,body)

# ---------- B. Areas banner (dark) 2400x560
def dark():
    W,H=2400,560; r=random.Random(9)
    body=f'<rect width="{W}" height="{H}" fill="#06382c"/><rect width="{W}" height="{H}" fill="url(#glow)"/>'
    body=body.replace('fill="url(#glow)"','fill="url(#glowD)"')
    body+='<defs><radialGradient id="glowD" cx="0.52" cy="0.5" r="0.6"><stop offset="0" stop-color="#c99a45" stop-opacity="0.42"/><stop offset="0.45" stop-color="#0d5846" stop-opacity="0.35"/><stop offset="1" stop-color="#052b22" stop-opacity="0"/></radialGradient></defs>'
    body+=f'<g filter="url(#soft)"><circle cx="1240" cy="285" r="170" fill="#e0b862" opacity="0.5"/></g>'
    body+=arc(1240,285,215,160,340,10,'#e3bd6b',.75)+arc(1240,285,228,185,320,3,'#e3bd6b',.5)
    mix=[('gold',4),('pale',2),('sage',4),('forest',2)]
    g=branch([(-60,470),(380,500),(800,250),(1100,330)],12,150,90,48,mix,r,stem='#c99a45',stem_op=.55)
    g+=branch([(2460,70),(2000,40),(1700,300),(1380,230)],12,150,90,48,mix,r,stem='#c99a45',stem_op=.55)
    g+=scatter(10,(300,40,2100,520),r,[('gold',3),('sage',2),('pale',2)],(30,60))
    body+=f'<g filter="url(#wc)">{g}</g>'
    return svg(W,H,body,dark=True)

# ---------- C. Portrait slot 900x1125
def portrait():
    W,H=900,1125; r=random.Random(21)
    body=f'<rect width="{W}" height="{H}" fill="#f4eee0"/>'
    body+='<defs><linearGradient id="archG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3dfae"/><stop offset="0.6" stop-color="#f8efd6"/><stop offset="1" stop-color="#e5ecdc"/></linearGradient>'
    body+='<clipPath id="archC"><path d="M170 820 V430 A280 280 0 0 1 730 430 V820 Z"/></clipPath></defs>'
    body+='<g filter="url(#soft)" opacity="0.5"><ellipse cx="450" cy="1030" rx="420" ry="90" fill="#a9bba8"/></g>'
    body+='<path d="M150 840 V430 A300 300 0 0 1 750 430 V840 Z" fill="none" stroke="#c99a45" stroke-opacity="0.7" stroke-width="3" filter="url(#brush)"/>'
    body+='<path d="M170 820 V430 A280 280 0 0 1 730 430 V820 Z" fill="url(#archG)"/>'
    body+='<g clip-path="url(#archC)"><g filter="url(#soft)"><circle cx="520" cy="360" r="170" fill="#ecca7c" opacity="0.6"/></g></g>'
    body+=arc(520,365,215,170,330,9,'#c99a45',.55)
    mix=[('forest',4),('deep',1),('sage',3),('gold',3)]
    g=branch([(120,1060),(250,820),(380,560),(560,300)],12,170,100,50,mix,r)
    g+=branch([(800,1070),(700,900),(650,760),(700,540)],9,140,85,46,mix,r)
    g+=scatter(7,(180,160,760,700),r,[('gold',3),('pale',2)],(34,60))
    body+=f'<g filter="url(#wc)">{g}</g>'
    return svg(W,H,body)

def contact():
    W,H=1200,760; r=random.Random(33)
    body=f'<rect width="{W}" height="{H}" fill="#f6f2e6"/>'
    body+='<g filter="url(#soft)" opacity="0.55"><ellipse cx="420" cy="720" rx="640" ry="120" fill="#a9bba8"/><ellipse cx="1000" cy="740" rx="420" ry="90" fill="#cfdccb"/></g>'
    body+='<g filter="url(#soft)"><circle cx="820" cy="300" r="190" fill="#e9c97f" opacity="0.6"/></g><g filter="url(#soft)"><circle cx="820" cy="300" r="115" fill="#f3dca0" opacity="0.7"/></g>'
    body+=arc(820,310,250,140,320,12,'#c99a45',.65)+arc(820,310,264,190,290,4,'#c99a45',.5)
    mix=[('forest',4),('deep',1),('sage',3),('gold',2)]
    g=branch([(-40,740),(230,700),(420,420),(640,380)],11,150,95,48,mix,r)
    g+=branch([(1260,760),(1060,640),(980,600),(900,640)],8,130,85,46,[('forest',3),('sage',2),('gold',3),('pale',1)],r)
    g+=scatter(12,(560,40,1180,560),r,[('gold',4),('forest',2),('pale',2)],(34,66))
    body+=f'<g filter="url(#wc)">{g}</g>'
    return svg(W,H,body)

if __name__=='__main__':
    import sys
    P='/home/claude/mann-manthan/public/images/'
    render(intro(),2400,560,'/tmp/art/botanical-intro.jpg')
    render(dark(),2400,560,'/tmp/art/botanical-dark.jpg')
    render(portrait(),900,1125,'/tmp/art/botanical-portrait.jpg')
    render(contact(),1200,760,'/tmp/art/botanical-contact.jpg')
    for f,(w,h) in {'botanical-intro.jpg':(2400,525),'botanical-dark.jpg':(2400,450)}.items():
        im=Image.open('/tmp/art/'+f); t=(im.height-h)//2; im.crop((0,t,w,t+h)).save('/tmp/art/'+f,quality=86,optimize=True)
    print('ok')
