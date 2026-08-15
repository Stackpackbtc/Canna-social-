import BrandPartners from '@/components/brand-partners'

export const metadata = { title: 'Canna Social — Brand Network', description: 'Explore Canna Social partner brands and collaborate with the cannabis community.' }

export default function PartnersPage(){
 return <main>
  <style>{`@keyframes networkPulse{0%,100%{box-shadow:0 8px 28px rgba(255,55,117,.22),0 0 0 0 rgba(255,55,117,.22)}50%{box-shadow:0 10px 34px rgba(255,55,117,.38),0 0 0 7px rgba(255,55,117,0)}}.network-access-bar{position:sticky;top:0;z-index:1000;padding:10px 14px;background:rgba(7,8,7,.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,72,133,.28);display:flex;justify-content:center}.network-access-inner{width:min(1180px,100%);display:flex;align-items:center;justify-content:space-between;gap:12px}.network-access-copy{display:flex;align-items:center;gap:10px;min-width:0}.network-access-star{width:34px;height:34px;display:grid;place-items:center;border:1px solid rgba(255,138,24,.7);border-radius:50%;color:#ff8a18;box-shadow:0 0 20px rgba(255,138,24,.15);flex:none}.network-access-copy div{min-width:0}.network-access-copy b{display:block;color:#fff;font-size:11px;letter-spacing:.12em}.network-access-copy span{display:block;color:#92968f;font-size:8px;letter-spacing:.08em;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.network-access-button{display:inline-flex;align-items:center;gap:7px;flex:none;padding:10px 14px;border-radius:9px;background:linear-gradient(135deg,#ff7a18,#ff3975);color:#fff;font-size:9px;font-weight:950;letter-spacing:.08em;text-decoration:none;animation:networkPulse 2.2s infinite}.network-access-links{display:flex;gap:7px;margin-left:auto}.network-access-links a{color:#b9beb7;text-decoration:none;font-size:8px;font-weight:800;padding:8px 9px;border:1px solid #30282d;border-radius:7px;background:#101010}.network-access-links a:hover{color:#fff;border-color:#ff477f}@media(max-width:700px){.network-access-bar{padding:8px 10px}.network-access-inner{gap:8px}.network-access-star{width:30px;height:30px}.network-access-copy b{font-size:9px}.network-access-copy span{font-size:7px}.network-access-links{display:none}.network-access-button{padding:9px 11px;font-size:8px}}`}</style>
  <div className="network-access-bar">
   <div className="network-access-inner">
    <div className="network-access-copy"><span className="network-access-star">✦</span><div><b>CANNA SOCIAL · BRAND NETWORK</b><span>Participating brands • creators • dispensaries • industry partners</span></div></div>
    <div className="network-access-links"><a href="#participating-brands">Brands</a><a href="#people-network">Community</a></div>
    <a className="network-access-button" href="#collaborate">WORK WITH US →</a>
   </div>
  </div>
  <BrandPartners />
 </main>
}
