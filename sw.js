// Cache hors ligne pour « Reconnais la Pièce ». Change VERSION à chaque mise à jour du jeu.
const VERSION = 'rlp-v2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png',
  './photos/abattant.jpg', './photos/adoucisseur.jpg', './photos/aerateur.jpg', './photos/anticalcaire.jpg', './photos/antiretouregout.jpg', './photos/applique.jpg', './photos/aquastop.jpg', './photos/arret.jpg', './photos/arretpurge.jpg', './photos/atlas.jpg', './photos/avaloirtoit.jpg', './photos/baignoire.jpg', './photos/ballofix.jpg', './photos/bandeetanch.jpg', './photos/barre.jpg', './photos/bati.jpg', './photos/bicone.jpg', './photos/boiler.jpg', './photos/bondedouche.jpg', './photos/bondeevier.jpg', './photos/bouchonf.jpg', './photos/bouchonm.jpg', './photos/bouchonpvc.jpg', './photos/brasure.jpg', './photos/broyeur.jpg', './photos/camera.jpg', './photos/caniveau.jpg', './photos/chalumeau.jpg', './photos/chasse.jpg', './photos/chauffegaz.jpg', './photos/cheville.jpg', './photos/cintreuse.jpg', './photos/cisaille.jpg', './photos/clapet.jpg', './photos/clicclac.jpg', './photos/cliptube.jpg', './photos/collepvc.jpg', './photos/colonne.jpg', './photos/compression.jpg', './photos/compteur.jpg', './photos/coude.jpg', './photos/coude45.jpg', './photos/coude45pvc.jpg', './photos/coudemf.jpg', './photos/coudepvc.jpg', './photos/coudesertir.jpg', './photos/coupeair.jpg', './photos/coupetube.jpg', './photos/croix.jpg', './photos/culotte.jpg', './photos/deboucheur.jpg', './photos/detecteur.jpg', './photos/detendeur.jpg', './photos/disconnecteur.jpg', './photos/doseur.jpg', './photos/douchetete.jpg', './photos/douchette.jpg', './photos/eaupluie.jpg', './photos/ebavureur.jpg', './photos/egoutpvc.jpg', './photos/electronique.jpg', './photos/equerre.jpg', './photos/evierinox.jpg', './photos/extracteur.jpg', './photos/filasse.jpg', './photos/filiere.jpg', './photos/filtre.jpg', './photos/flexgaz.jpg', './photos/flexible.jpg', './photos/flotteur.jpg', './photos/frigo.jpg', './photos/furet.jpg', './photos/gaz.jpg', './photos/gouttiere.jpg', './photos/grille.jpg', './photos/groupesecu.jpg', './photos/hydrophore.jpg', './photos/inoxsertir.jpg', './photos/isolation.jpg', './photos/jardin.jpg', './photos/jointfibre.jpg', './photos/lavabo.jpg', './photos/lavemains.jpg', './photos/machinelaver.jpg', './photos/mamelon.jpg', './photos/manchettelav.jpg', './photos/manchettewc.jpg', './photos/manchon.jpg', './photos/manchongalva.jpg', './photos/manchonpvc.jpg', './photos/manometre.jpg', './photos/marteau.jpg', './photos/melangeur.jpg', './photos/mitigeur.jpg', './photos/mitigeurbain.jpg', './photos/mitigeurevier.jpg', './photos/molette.jpg', './photos/multicouche.jpg', './photos/multiprise.jpg', './photos/multisertir.jpg', './photos/paroi.jpg', './photos/pateetanch.jpg', './photos/pehd.jpg', './photos/per.jpg', './photos/pincesertir.jpg', './photos/plaque.jpg', './photos/plt.jpg', './photos/pompe.jpg', './photos/pompedeb.jpg', './photos/pompeepreuve.jpg', './photos/pvc.jpg', './photos/raccordpe.jpg', './photos/rail.jpg', './photos/receveur.jpg', './photos/reducmf.jpg', './photos/reducpvc.jpg', './photos/reducteur.jpg', './photos/reduction.jpg', './photos/reservoirapp.jpg', './photos/robservice.jpg', './photos/romax.jpg', './photos/scie.jpg', './photos/scietrepan.jpg', './photos/sertir.jpg', './photos/sertirgaz.jpg', './photos/silicone.jpg', './photos/siphon.jpg', './photos/siphonevier.jpg', './photos/sterput.jpg', './photos/stillson.jpg', './photos/tampon.jpg', './photos/te.jpg', './photos/teflon.jpg', './photos/temporise.jpg', './photos/temulti.jpg', './photos/tepvc.jpg', './photos/tesertir.jpg', './photos/thermodouche.jpg', './photos/thermodyn.jpg', './photos/thermometre.jpg', './photos/tige.jpg', './photos/tournevis.jpg', './photos/trappe.jpg', './photos/tubecu.jpg', './photos/tubegaz.jpg', './photos/tubepp.jpg', './photos/union.jpg', './photos/vanne.jpg', './photos/vasque.jpg', './photos/ventiltoit.jpg', './photos/vidagebain.jpg', './photos/vidoir.jpg', './photos/visseuse.jpg', './photos/wcposeprod.jpg', './photos/wcsusp.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Polices Google : servies depuis le cache, rafraîchies en arrière-plan
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // Pages : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { caches.open(VERSION).then(c => c.put('./index.html', r.clone())); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
