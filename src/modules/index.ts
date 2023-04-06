import initBOGO from './bogo';
import initCP from './cp';
import initDC from './dc';
import initEF from './ef';
import initMC from './mc';
import initOL from './ol';
import initQB from './qb';
import initQI from './qi';
import initRF from './rf';
import initSR from './sr';
import initTD from './td';
import initTE from './te';

export async function init() {
    return Promise.allSettled([
        initBOGO(),
        initCP(),
        initDC(),
        initEF(),
        initMC(),
        initOL(),
        initQB(),
        initQI(),
        initRF(),
        initSR(),
        initTD(),
        initTE(),
    ]);
}
