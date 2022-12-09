import {FULLSCREEN_PAGES} from '../../authentication/constants';
import {matchPath} from 'react-router-dom';

export default function(pathName) {
    let flag = false;
    for (let i=0; i<FULLSCREEN_PAGES.length; i++) {
        if (matchPath(pathName, {
            path: FULLSCREEN_PAGES[i],
            exact: true,
            strict: false,
        })) {
            flag = true;
            break;
        }
    }
    return flag;
};