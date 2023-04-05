import BOGO from './bogo';
import CP from './cp';
import DC from './dc';
import EF from './ef';
import MC from './mc';
import OL from './ol';
import QB from './qb';
import QI from './qi';
import RF from './rf';
import SR from './sr';
import TD from './td';
import TE from './te';

async function init() {
    await Promise.allSettled([
        (new BOGO(window.BSS_B2B.modules.bogo)).init(),
        (new CP(window.BSS_B2B.modules.cp)).init(),
        (new DC(window.BSS_B2B.modules.dc)).init(),
        (new EF(window.BSS_B2B.modules.ef)).init(),
        (new MC(window.BSS_B2B.modules.mc)).init(),
        (new OL(window.BSS_B2B.modules.ol)).init(),
        (new QB(window.BSS_B2B.modules.qb)).init(),
        (new QI(window.BSS_B2B.modules.qi)).init(),
        (new RF(window.BSS_B2B.modules.rf)).init(),
        (new SR(window.BSS_B2B.modules.sr)).init(),
        (new TD(window.BSS_B2B.modules.td)).init(),
        (new TE(window.BSS_B2B.modules.te)).init(),
    ]);
}

export { init };
