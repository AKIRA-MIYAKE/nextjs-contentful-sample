import type { FC } from 'react';
import Script from 'next/script';

const scriptHtml = `
(function(p,r,o,j,e,c,t,g){
p['_'+t]={};g=r.createElement('script');g.src='https://www.googletagmanager.com/gtm.js?id=GTM-'+t;r[o].prepend(g);
g=r.createElement('style');g.innerText='.'+e+t+'{visibility:hidden!important}';r[o].prepend(g);
r[o][j].add(e+t);setTimeout(function(){if(r[o][j].contains(e+t)){r[o][j].remove(e+t);p['_'+t]=0}},c)
})(window,document,'documentElement','classList','loading',2000,'KDD9QHPM')
`;

export const OptimizeNext: FC = () => {
  return (
    <Script
      id="optimize-next-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: scriptHtml,
      }}
    />
  );
};
